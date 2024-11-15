import { HashRouter, Route, Routes, Link } from 'react-router-dom'
import Login from './login';
import Register from './register';
import EmployeeForm from './employee';
import EmployeeDetails from './employeedetails';
function App() {
    return (
        <HashRouter>
            <nav className="navbar navbar-expand-lg bg-body-tertiary" data-bs-theme="dark">
                <div className="container">
                    <Link className="navbar-brand" href="#"> Employe <i className='fa fa-user-plus'> </i> </Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo03" aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
                        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">


                            <li className="nav-item me-4">
                                <Link className="nav-link active" to="/"> <i className="fa fa-edit"> </i> Register </Link>
                            </li>
                            <li className="nav-item me-4">
                                <Link className="nav-link active" to="employee"> <i className="fa fa-user"> </i> Employee </Link>
                            </li>
                          
                            {/* <li className="nav-item me-4">
                                <Link className="nav-link active" to="data"> <i className="fa fa-user"> </i> Employee details </Link>
                            </li>
                           */}
                            <button className='btn btn-info' onClick={logoutme}>
                                Hi, {localStorage.getItem("myname")}-Logout
                            </button>

                        </ul>
                    </div>
                </div>
            </nav>

            <Routes>
                <Route exact path='/' element={<Register />} />
                <Route exact path='employee' element={<EmployeeForm />} />
                {/* <Route exact path='data' element={<EmployeeDetails />} /> */}
               
            </Routes>

        </HashRouter>

    );
}

export default App;
const logoutme = () => {
    localStorage.clear();
    window.location.reload();
}
