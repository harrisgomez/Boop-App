var mongoose = require('mongoose');
var users = require('./../controllers/users.js'); // routes us to back-end controllers

module.exports = function(app){
    app.post('/login', users.show);
    app.post('/register', users.create);
    app.get('/users/:id', users.index);
};
