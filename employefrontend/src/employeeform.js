import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const EmployeeForm = () => {
    // State variables
    const date = new Date();
    const newDate = date.toLocaleDateString();

    let [employeeData, setEmployeeData] = useState([]);
    let [name, setName] = useState("");
    let [email, setEmail] = useState("");
    let [mobile, setMobile] = useState("");
    let [designation, setDesignation] = useState("");
    let [gender, setGender] = useState("");
    let [course, setCourse] = useState(""); // Single course, but we still keep it as a string
    let [img, setImg] = useState("");
    let [ndate, setNdate] = useState(newDate);
    


    // Error messages state
    let [errors, setErrors] = useState({});

    // Save function (form submission)
    const save = () => {
        // Clear previous errors
        

            // Basic validation checks
            let formErrors = {};
            if (!name) formErrors.name = "Name is required.";
            if (!email) formErrors.email = "Email is required.";
            else if (!/\S+@\S+\.\S+/.test(email)) formErrors.email = "Email is invalid.";
            if (!mobile) formErrors.mobile = "Mobile number is required.";
            else if (!/^\d{10}$/.test(mobile)) formErrors.mobile = "Mobile number should be 10 digits.";
            if (!designation) formErrors.designation = "Designation is required.";
            if (!gender) formErrors.gender = "Gender is required.";
            if (!course) formErrors.course = "Please select a course.";
            if (!img) formErrors.img = "Image URL is required.";
        

            if (Object.keys(formErrors).length > 0) {
                setErrors(formErrors);
                return;
            }



            // Prepare request data
            const info = {
                ename: name,
                eemail: email,
                emobile: mobile,
                edesignation: designation,
                egender: gender,
                ecourse: course,
                eimg: img,
                edate: ndate
            };

            const postdata = {
                headers: { "Content-Type": "application/json" },
                method: "POST",
                body: JSON.stringify(info),
            };

            // Make the request to the backend
            fetch("http://localhost:1112/employee", postdata)
                .then((response) => {
                    if (!response.ok) {
                        return response.json().then((data) => {
                            throw new Error(data.error || "Failed to save employee");
                        });
                    }
                    return response.json();
                })
                .then((employeeArray) => {
                    alert("Save successful!");
            
                    setName("")
                    setCourse("")
                    setDesignation("")
                    setEmail("")
                    setGender("")
                    setImg("")
                    setMobile("")
                })
                .catch((error) => {
                    // Check if the error is about duplicate email
                    if (error.message === "Email is already in use.") {
                        setErrors((prevErrors) => ({
                            ...prevErrors,
                            email: "Email is already in use."
                        }));
                    } else {
                        alert("Error: " + error.message);
                    }
                });

    };

    // Handle course checkbox change (only one active)
    const handleCourseChange = (e) => {
        // When a new course is selected, uncheck any previously selected course
        setCourse(e.target.checked ? e.target.value : ""); // If checked, set the course, else reset it
    };



    return (
        <div className="container">
            <section id="employee">
                <div className="row mt-5">
                    <div className="col-lg-3">

                    </div>
                    <div className="col-lg-6" >
                        <div className="card">
                            <div className="card-header text-center">Create Employee</div>

                            <div className="card-body">
                                {/* Name Field */}
                                <div className="row mb-3">
                                    <div className="col-lg-6">Name</div>
                                    <div className="col-lg-6">
                                        <input
                                            type="text"
                                            className="form-control"
                                            onChange={(obj) => setName(obj.target.value)}
                                            value={name}
                                        />
                                        {errors.name && <div className="text-danger">{errors.name}</div>}
                                    </div>
                                </div>

                                {/* Email Field */}
                                <div className="row mb-3">
                                    <div className="col-lg-6">Email</div>
                                    <div className="col-lg-6">
                                        <input
                                            type="text"
                                            className="form-control"
                                            onChange={(obj) => setEmail(obj.target.value)}
                                            value={email}
                                        />
                                        {errors.email && <div className="text-danger">{errors.email}</div>}
                                    </div>
                                </div>

                                {/* Mobile Field */}
                                <div className="row mb-3">
                                    <div className="col-lg-6">Mobile</div>
                                    <div className="col-lg-6">
                                        <input
                                            type="text"
                                            className="form-control"
                                            onChange={(obj) => setMobile(obj.target.value)}
                                            value={mobile}
                                        />
                                        {errors.mobile && <div className="text-danger">{errors.mobile}</div>}
                                    </div>
                                </div>

                                {/* Designation Field */}
                                <div className="row mb-3">
                                    <div className="col-lg-6">Designation</div>
                                    <div className="col-lg-6">
                                        <select
                                            className="form-select"
                                            onChange={(obj) => setDesignation(obj.target.value)}
                                            value={designation}
                                        >
                                            <option value="">Choose</option>
                                            <option>HR</option>
                                            <option>Manager</option>
                                            <option>Sales</option>
                                        </select>
                                        {errors.designation && <div className="text-danger">{errors.designation}</div>}
                                    </div>
                                </div>

                                {/* Gender Radio Buttons */}
                                <div className="row mb-3">
                                    <div className="col-lg-6">Gender</div>
                                    <div className="col-lg-6">
                                        <div className="form-check form-check-inline">
                                            <input
                                                type="radio"
                                                className="form-check-input"
                                                onChange={(obj) => setGender(obj.target.value)}
                                                value="male"
                                                checked={gender === "male"}
                                            />
                                            <label className="form-check-label">Male</label>
                                        </div>
                                        <div className="form-check form-check-inline">
                                            <input
                                                type="radio"
                                                className="form-check-input"
                                                onChange={(obj) => setGender(obj.target.value)}
                                                value="female"
                                                checked={gender === "female"}
                                            />
                                            <label className="form-check-label">Female</label>
                                        </div>
                                        {errors.gender && <div className="text-danger">{errors.gender}</div>}
                                    </div>
                                </div>

                                {/* Course Checkboxes */}
                                <div className="row mb-3">
                                    <div className="col-lg-6">Courses</div>
                                    <div className="col-lg-6">
                                        <div className="form-check">
                                            <input
                                                type="checkbox"
                                                className="form-check-input"
                                                onChange={handleCourseChange}
                                                value="MCA"
                                                checked={course === "MCA"}
                                            />
                                            <label className="form-check-label">MCA</label>
                                        </div>
                                        <div className="form-check">
                                            <input
                                                type="checkbox"
                                                className="form-check-input"
                                                onChange={handleCourseChange}
                                                value="BCA"
                                                checked={course === "BCA"}
                                            />
                                            <label className="form-check-label">BCA</label>
                                        </div>
                                        <div className="form-check">
                                            <input
                                                type="checkbox"
                                                className="form-check-input"
                                                onChange={handleCourseChange}
                                                value="BSC"
                                                checked={course === "BSC"}
                                            />
                                            <label className="form-check-label">BSC</label>
                                        </div>
                                        {errors.course && <div className="text-danger">{errors.course}</div>}
                                    </div>
                                </div>

                                {/* Image URL Field */}
                                <div className="row mb-3">
                                    <div className="col-lg-6">Image URL</div>
                                    <div className="col-lg-6">
                                        <input
                                            type="text"
                                            className="form-control"
                                            onChange={(e) => setImg(e.target.value)}
                                            value={img}
                                        />
                                        {errors.img && <div className="text-danger">{errors.img}</div>}
                                    </div>
                                </div>

                            </div>
                            <div className="card-footer text-center">
                                <button className="btn btn-success" onClick={save}>Submit</button>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-3"></div>
                </div>
            </section>
        </div>
    );
};

export default EmployeeForm;
