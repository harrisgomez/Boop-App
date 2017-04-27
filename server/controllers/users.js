console.log('server users controller is loaded');
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var User = mongoose.model('User');

module.exports = {
    index: function(req,res){
        User.findOne({_id: req.params.id}, function(err, results){
            return res.json(results); // this is what gets sent back to the .then function in factory
        })
    },

    create: function(req,res){
        if(req.body.password === req.body.confirm_pw){
            User.create(req.body, function(err, result){
                if(err){
                    console.log(err);
                    return res.json(err);
                }else{
                    console.log(result);
                    return res.json(result); // this is what gets sent back to the .then function in factory
                }
            })
        }
    },

    show: function(req,res){
        console.log(req.body)
        if(req.body.email && req.body.password){
            User.findOne({email: req.body.email}, function(err, result){
                if(err){
                    console.log(err)
                }
                else if(result){
                    if(result.password === req.body.password){
                        return res.json(result);
                    }else{
                        return res.json({error: "No users match that email/password combination."});
                    }
                }
                else {
                    return res.json({error: "No users match that email/password combination."});
                }
            })
        }else{
            console.log('bye');
        }
    }
}
