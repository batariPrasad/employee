
const mongoose = require("mongoose");


const tablestructure = new mongoose.Schema({
    fullname :{type:String, required:true},
    email      : {type:String,required:true},
    password      :{type:String,required:true},
    mobile      :{type:String,required:true},
    active      :{type:String,required:true}
   

});
module.exports=mongoose.model("MyLogin",tablestructure)