const express = require("express")
const router = express.Router();
module.exports = router

const MyLogin = require("./loginschema")

router.post("/",async(req,res)=>{
    let input = {fullname:req.body.myfullname, password:req.body.mypassword, active:"YES"}
    
    
    let info = await MyLogin.find(input);
    if(info.length==0){
        res.status(200).json({"message":"Invalid or Not Exists","status":"Fail"});
    }else{
        let returndata = {fullname:info[0].fullname,
            id:info[0]._id,
            message:"success ! Redirecting ..",
            status:"PASS"
        };
    
        
       
        res.status(200).json(returndata)
    }
});

router.post("/signup",async (req,res)=>{
    let newuser = MyLogin({
        "fullname":req.body.myfullname,
        "email":req.body.myemail,
        "password":req.body.mypassword,
        "mobile":req.body.mymobile,
        "active":"YES"
    });
    let info = await newuser.save();
    res.status(200).json(info)
})

