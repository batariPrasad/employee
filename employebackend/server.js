const express = require("express");
const cors = require("cors");
const app = express()
app.use(cors())
app.use(express.json())

const mongoose = require("mongoose");
mongoose.connect("mongodb://127.0.0.1:27017/easytohire")
 const db =mongoose.connection
 
 db.on("error",(error)=>console.log("Error in database connection"));
 db.on('open',()=>console.log(" Database Connected"))

 
 const MyLogin = require("./loginapi")
 app.use("/managelogin",MyLogin)

 const a = require("./employeeapi")
 app.use("/employee",a)

//  const MyTotal = require("./totalapi")
//  app.use("/managetotal",MyTotal)

 app.listen(1112,function(){
    console.log("the server is live ...")
 })