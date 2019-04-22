var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    email: {type:String, require:true},
    one:{type:String, require:true},
    two:{type:String, require:true},
    three:{type:Object, require:false},
});


module.exports = mongoose.model('Answer',schema);