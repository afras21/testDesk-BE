var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt');

var schema = new Schema({
    username: {type:String, require:true},
    q1:{type:String, require:true},
    q2:{type:String, require:true},
    q3:{type:Object, require:true},
});


module.exports = mongoose.model('Answer',schema);