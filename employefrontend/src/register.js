import { useState,useEffect } from "react";

const Register = ()=>{
    let[fullname,setFullName]=useState("")
    let[email,setEmail]=useState("")
    let[password,setPassword]=useState("")
    let[mobile,setMobile]=useState("")
    let[active,setactive]=useState("")
    

    const save = ()=>{
        let newinfo = {
            myfullname:fullname,
            myemail:email,
            mypassword:password,
            myActive:active,
            mymobile:mobile
        }
            let url="http://localhost:1112/managelogin/signup"
        let postdata = {
            headers :{'content-Type':'application/json'},
            method :'post',
            body:JSON.stringify(newinfo)
        }

        fetch(url,postdata)
        .then(response=>response.json())
        .then(info=>{
            alert("save");
        })
    }
    return(
        <div className="container">
            <div className="row mt-5">
                <div className="col-lg-4"></div>
                <div className="col-lg-4">
                    <div className="card">
                        <div className="card-header text-center bg-danger text-white fs-4">
                            <p> Register <i className="fa fa-user-plus"> </i></p>
                        </div>
                        <div className="card-body">
                            <div className="mt-2">
                                <label> Enter  the FullName </label>
                                <input type="text" className="form-control" onChange={obj=>setFullName(obj.target.value)} value={fullname} />
                            </div>
                            <div className="mt-2">
                                <label> Enter  the E-Mail Id  </label>
                                <input type="email" className="form-control" onChange={obj=>setEmail(obj.target.value)} value={email} />
                            </div>
                            <div className="mt-2">
                                <label> Enter  the Mobile </label>
                                <input type="number" className="form-control" onChange={obj=>setMobile(obj.target.value)} value={mobile} />
                            </div>
                            <div className="mt-2">
                                <label> Enter  the password </label>
                                <input type="text" className="form-control" onChange={obj=>setPassword(obj.target.value)} value={password} />
                            </div>
                            {/* <div className="mt-2">
                                <label> Enter  the status </label>
                                <select className="form-control" onChange={obj=>setactive(obj.target.value)} value={active} >
                                    <option> yes</option>
                                </select>
                            </div> */}
                        </div>
                        <div className="card-footer text-center">
                        <button className="btn btn-danger" onClick={save}>
                            Register <i className="fa fa-user-tie"> </i>
                        </button>
                    </div>
                    </div>

                </div>
                <div className="col-lg-4"></div>
            </div>
        </div>
    )
}
export default Register;