import { useState } from "react"
const Login = ()=>{
    let[fullname,setFullname]=useState("")
    let[password,setpassword]=useState("")


    let[msg,setmsg]=useState(" Enter Login Details")


    const Gologin = ()=>{
        setmsg("Please Wait .... ")
        let url="http://localhost:1112/managelogin"
        let input = {"myfullname":fullname,"mypassword":password}
        let postdata = {
            headers :{'content-Type':'application/json'},
            method :'post',
            body :JSON.stringify(input)
        }
        fetch(url,postdata)
        .then(res=>res.json())
        .then(userinfo=>{
            setmsg(userinfo.message)
            if(userinfo.status=="PASS"){
                localStorage.setItem("token",userinfo.id);
                localStorage.setItem("myname",userinfo.fullname);
                window.location.reload(); //reload the current page
            }



            // alert(userinfo.status);
            setFullname("")
            setpassword("")

        })
    }
    return(
        <div className="container">
            <div className="row mt-5">
                <div className="col-lg-4"></div>
                <div className="col-lg-4">
                    <div className="card">
                        <div className="card-header text-center bg-danger text-white">
                            <p> Login   <i className="fa fa-lock"> </i>  </p>
                        </div>
                        <div className="card-body">

                            <div className="mt-2">
                                <p className="text-center text-primary"> {msg}</p>
                                <label> Enter UserName</label>
                                <input type="text" className="form-control" onChange={obj=>setFullname(obj.target.value)} value={fullname} />
                            </div>
                            <div className="mt-2">
                                <label> Enter Password </label>
                                <input type="password" className="form-control" onChange={obj=>setpassword(obj.target.value)} value={password} />
                            </div>
                        </div>
                        <div className="card-footer text-center">
                            <button className="btn btn-danger" onClick={Gologin}>   LogIn  <i className="fa fa-arrow-right"> </i></button>
                        </div>
                    </div>
                </div>
                <div className="col-lg-4"></div>
            </div>
        </div>
    )
}
export default Login