import { useState } from "react";
import { useHistory } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();  // For redirecting after successful login

  const login = () => {
    const loginInfo = {
      myEmail: email,
      myPassword: password
    };

    const url = "http://localhost:1112/login";  // Adjust the URL to your server's login route

    const postData = {
      headers: { 'Content-Type': 'application/json' },
      method: 'POST',
      body: JSON.stringify(loginInfo)
    };

    fetch(url, postData)
      .then(response => response.json())
      .then(info => {
        if (info.success) {
          alert("Login successful!");
          history.push("/dashboard");  // Redirect to a dashboard or home page
        } else {
          alert("Invalid email or password");
        }
      })
      .catch(err => console.error("Error:", err));
  };

  return (
    <div className="container">
      <div className="row mt-5">
        <div className="col-lg-4"></div>
        <div className="col-lg-4">
          <div className="card">
            <div className="card-header text-center bg-danger text-white fs-4">
              <p>Login <i className="fa fa-sign-in"></i></p>
            </div>
            <div className="card-body">
              <div className="mt-2">
                <label>Enter the E-Mail Id</label>
                <input
                  type="email"
                  className="form-control"
                  onChange={obj => setEmail(obj.target.value)}
                  value={email}
                />
              </div>
              <div className="mt-2">
                <label>Enter the password</label>
                <input
                  type="password"
                  className="form-control"
                  onChange={obj => setPassword(obj.target.value)}
                  value={password}
                />
              </div>
            </div>
            <div className="card-footer text-center">
              <button className="btn btn-danger" onClick={login}>
                Login <i className="fa fa-sign-in"></i>
              </button>
            </div>
          </div>
        </div>
        <div className="col-lg-4"></div>
      </div>
    </div>
  );
};

export default Login;
