const express = require("express");
const router = express.Router();
const Employee = require("./employeschema");  // Assuming you have the employee schema defined

// Fetch all employees
router.get("/", async (req, res) => {
    try {
        let data = await Employee.find();  // Fetch all employee records
        res.status(200).json(data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error fetching employees" });
    }
});

// Create a new employee
router.post("/", async (req, res) => {
    try {
        // Check if an employee with the same email already exists
        const existingEmployee = await Employee.findOne({ email: req.body.eemail });

        if (existingEmployee) {
            // If the email already exists, return a duplicate email error
            return res.status(400).json({ error: "Email is already in use." });
        }

        // If no duplicate, create a new employee object
        const newEmployee = new Employee({
            name: req.body.ename,
            email: req.body.eemail,
            mobile: req.body.emobile,
            designation: req.body.edesignation,
            gender: req.body.egender,
            course: req.body.ecourse,
            img: req.body.eimg,
            date : req.body.edate
        });

        // Save the new employee to the database
        const info = await newEmployee.save();
        res.status(201).json(info);  // Return the saved employee data

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error saving employee" });
    }
});




router.delete("/:employeeid",async (req,res)=>{
    let employeeid = req.params.employeeid;
    let employeeinfo = await Employee.findById(employeeid);
    if(employeeinfo==null){
     res.status(200).json({"message":"No Such Records"});
    }else{
     await employeeinfo.deleteOne();
     res.status(200).json({"message":"employee Delted Successfully "});
    }
    
 })
 
 router.put("/",async (req,res)=>{
     let employeeId = req.body.employeeid;
     let oldemployeeinfo = await Employee.findById(employeeId);
     if(employeeId==null){
         res.status(200).json({"message":"No Such Records"})
     }else{
        oldemployeeinfo.name= req.body.ename,
        oldemployeeinfo.email= req.body.eemail,
        oldemployeeinfo.mobile= req.body.emobile,
        oldemployeeinfo.designation= req.body.edesignation,
        oldemployeeinfo.gender= req.body.egender,
        oldemployeeinfo.course= req.body.ecourse,
        oldemployeeinfo.img= req.body.eimg,
        oldemployeeinfo.date= req.body.edate,
         await oldemployeeinfo.save();
         res.status(200).json({"message":"Records are updated Successfully"})
     }
 })

module.exports = router;
