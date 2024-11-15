import { useState, useEffect } from "react";

const EmployeeDetails = () => {
    let [employeeData, setEmployeeData] = useState([]);
    let [selectedEmployee, setSelectedEmployee] = useState(null); // To store the selected employee for editing
    let [showModal, setShowModal] = useState(false); // To control the modal visibility
    let [updatedName, setUpdatedName] = useState(""); // Example field for the employee name
    let [updatedEmail, setUpdatedEmail] = useState(""); // Example field for the employee email

    // Fetch employee data
    const getEmployee = () => {
        fetch("http://localhost:1112/employee")
            .then((response) => response.json())
            .then((earray) => {
                setEmployeeData(earray);
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

    // Open the modal to edit employee details
    const editEmployee = (employee) => {
        setSelectedEmployee(employee);
        setUpdatedName(employee.name);
        setUpdatedEmail(employee.email);
        setShowModal(true);
    };

    // Handle the form submission to update employee details
    const handleUpdate = () => {
        let updatedEmployee = {
            ...selectedEmployee,
            name: updatedName,
            email: updatedEmail,
        };

        fetch(`http://localhost:1112/employee/${updatedEmployee._id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedEmployee),
        })
            .then((response) => response.json())
            .then(() => {
                getEmployee(); // Refresh the employee data
                setShowModal(false); // Close the modal
            })
            .catch((err) => {
                console.error("Error updating employee:", err);
            });
    };

    // Fetch employee data on component mount
    useEffect(() => {
        getEmployee();
    }, []);

    return (
        <div className="container">
            <table className="table">
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
                        return (
                            <tr key={index}>
                                <td>{employee._id}</td>
                                <td>
                                    {employee.img ? (
                                        <img
                                            src={employee.img}
                                            alt={employee.name}
                                            style={{
                                                width: "50px",
                                                height: "50px",
                                                objectFit: "cover",
                                            }}
                                            onError={(e) =>
                                                (e.target.src = "https://via.placeholder.com/50")
                                            }
                                        />
                                    ) : (
                                        "No image"
                                    )}
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
                                        className="btn btn-success btn-sm"
                                        onClick={() => editEmployee(employee)} // Pass employee to edit
                                    >
                                        Edit
                                    </button>
                                </td>
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

            {/* Modal for editing employee details */}
            {showModal && (
                <div className="modal">
                    <div className="modal-content">
                        <h2>Edit Employee</h2>
                        <div>
                            <label>Name</label>
                            <input
                                type="text"
                                value={updatedName}
                                onChange={(e) => setUpdatedName(e.target.value)}
                            />
                        </div>
                        <div>
                            <label>Email</label>
                            <input
                                type="email"
                                value={updatedEmail}
                                onChange={(e) => setUpdatedEmail(e.target.value)}
                            />
                        </div>
                        <div>
                            <button className="btn btn-primary" onClick={handleUpdate}>
                                Update
                            </button>
                            <button
                                className="btn btn-secondary"
                                onClick={() => setShowModal(false)} // Close modal
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default EmployeeDetails;
