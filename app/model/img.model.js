var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var img_Schema = new Schema({
	url: {type: String,required: true},
	fileName : {type: String,require: true},
});

var img_layout = mongoose.model('imageModel', img_Schema);

module.exports = img_layout;