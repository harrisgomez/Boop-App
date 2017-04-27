var express = require('express');
var path = require('path');
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, './client'))); // loads your main index. Basically says look inside this folder and run what's inside
app.use(express.static(path.join(__dirname, './bower_components'))); // loads your bower components
app.use(bodyParser.json()); // need this to send JSON objects to backend

app.set('views', path.join(__dirname, './client/views'));
app.set('view engine', 'ejs');

require('./server/config/mongoose.js');
require("./server/config/routes.js")(app);

var routes_setter = require('./server/config/routes.js');
routes_setter(app);

var server = app.listen(8000, function() {
    console.log("listening on port 8000");
})

// sockets
var io = require('socket.io').listen(server);

var messages = [];
io.sockets.on('connection', function(socket){
    var users = [];
    var is_user = function(user){
        var users_count = users.length;
        for(var i=0; i<users_count; i++){
            if(user == users[i]){
                return true;
            }
        }
        return false;
    }

    socket.on('page_load', function(data){
        if(is_user(data.user) === true){
            socket.emit('existing_user', {error: 'This user already exists'});
        }else{
            users.push(data.user);
            socket.emit('load_messages', {current_user: data.user, messages: messages});
        }
    })

    socket.on('new_message', function(data){
        messages.push({name: data.user, message: data.message});
        io.emit('post_new_message', {new_message: data.message, user: data.user});
    })

    socket.on('initiate_video', function(){
        io.emit('embed_video');
    })

})
