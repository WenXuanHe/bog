var mongoose = require("mongoose");
    mongoose.connect("mongodb://localhost/fileName");
var schema =new mongoose.Schema({
    title:String,
    currentTime:Date,
    path:String
});
module.exports= mongoose.model("fileName", schema);