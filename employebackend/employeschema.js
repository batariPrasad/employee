const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },  // Ensure email is unique
    mobile: { type: String, required: true },
    designation: { type: String, required: true },
    gender: { type: String, required: true },
    course: { type: String, required: true },
    img: { type: String, required: true },
    date :{type:String,required:true}
});

module.exports = mongoose.model("Employee", employeeSchema);
