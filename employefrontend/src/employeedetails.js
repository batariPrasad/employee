import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Update = () => {
    // State variables
    

    let [employeeData, setEmployeeData] = useState([]);
   
    let [keyword, setKeyword] = useState("");



   
   
    // Fetch employee data
    const getEmployee = () => {
        fetch("http://localhost:1112/employee")
            .then((response) => response.json())
            .then((earray) => {
                setEmployeeData(earray.reverse());
            })
            .catch((err) => {
                console.error("Error fetching employee data:", err);
            });
    };

    // Function to delete an employee
    const delpro = (id) => {
        let url = "http://localhost:1112/employee/" + id;
        let postdata = { method: "DELETE" };
        fetch(url, postdata)
            .then((response) => response.json())
            .then(() => {
                // Refresh employee list after deletion
                getEmployee();
            })
            .catch((err) => {
                console.error("Error deleting employee:", err);
            });
    };

    // Fetch employee data on component mount
    useEffect(() => {
        getEmployee();
    }, []);

    
   
   
    return (
        <div className="container">
           
            {/* Employee Table */}
            <section id="employee1" >
                <div className="row mb-3" >
                    <div className="text-center text-warning mt-5">  <h3> Employe List </h3></div>
                    <div className="col-lg-4"></div>
                    <div className="col-lg-4 mt-3" > <h4>   {employeeData.length}-total count </h4> </div>
                    <div className="col-lg-4">

                        <div className="  text-center mt-3">

                            <input className="form-control" placeholder="Search" onChange={obj => setKeyword(obj.target.value)} value={keyword} type="serch" />
                        </div>
                    </div>
                </div>
                <table className="table table-bordered ">
                    <thead>
                        <tr>
                            <th>Unique Id</th>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Mobile No</th>
                            <th>Designation</th>
                            <th>Gender</th>
                            <th>Course</th>
                            <th>Create Date</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {employeeData.map((employee, index) => {
                            if (employee.name.toLowerCase().match(keyword.toLowerCase()) || employee.mobile.toString().match(keyword))
                                return (
                                    <tr key={index}>
                                        <td>{employee._id}</td>
                                        <td>
                                            <img src={employee.img} height={60} width={60} />
                                        </td>

                                        <td>{employee.name}</td>
                                        <td>
                                            <a href={`mailto:${employee.email}`}>{employee.email}</a>
                                        </td>
                                        <td>{employee.mobile}</td>
                                        <td>{employee.designation}</td>
                                        <td>{employee.gender}</td>
                                        <td>{employee.course}</td>
                                        <td>{employee.date}</td>
                                        <td>
                                            <button
                                                className="btn btn-danger btn-sm"
                                                onClick={() => delpro(employee._id)} // Pass employee._id to delete
                                            >
                                                Delete
                                            </button>
                                        
                                        </td>


                                    </tr>
                                );
                        })}
                    </tbody>
                </table>
            </section>

          
        </div>
    );
};

export default Update;
