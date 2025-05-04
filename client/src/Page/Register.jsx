import React, { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { userRegister } from "../services/user"

function Register() {
    //takes user input then stored into userinfo by userinfo validating field and then retrieving eac field from userinfo and 
    //sending to axios(connected with backend) through backend storing to database
    const [userInfo, SetUserInfo] = useState({
        Name: '',
        Email: '',
        Password: '',
        ConfirmPassword: '',
        Phone: ''
    })

    const navigate = useNavigate()

    async function onRegister() {

        //validation

        if (userInfo.Name.length == 0) {
            toast.error("Name Cannot be Empty ")
        } else if (userInfo.Email.length == 0) {
            toast.error("Email Cannot be Empty ")
        } else if (userInfo.Password.length == 0) {
            toast.error("Password Cannot be Empty ")
        }
        else if (userInfo.Password != userInfo.ConfirmPassword) {
            toast.error("Confirm Password doesn't match")
        }
        else if (userInfo.Phone.length == 0) {
            toast.error("Phone Number can't be empty")
        } else {
            //make api call
            const { Name, Email, Password, Phone } = userInfo     //NAME IN userinfo given should be same here as well while passing
            //too need to both connection to be on -> client and server 
    
            const result = await userRegister(Name, Email, Password, Phone)
            if (result['status'] == 'success') {
                toast.success("Registration Successful !")
                navigate('/log')
            } else {
                toast.error(result.e)
            }

        }



    }

    return (
        <div>
            <div className=" mt-4">
                <h1 style={{ textAlign: "center" }}>User Registration</h1>

                <div className="row m-3">
                    <div className="col"></div>
                    <div className="col-5">

                        <div className="form-group">
                            <label >Name</label>
                            <input type="text" className="form-control mb-3"
                                onChange={(e) => {
                                    SetUserInfo({ ...userInfo, Name: e.target.value })
                                }}
                                placeholder="Enter name" />
                        </div>

                        <div className="form-group">
                            <label >Email address</label>
                            <input type="email" className="form-control mb-3"
                                onChange={(e) => {
                                    SetUserInfo({ ...userInfo, Email: e.target.value })
                                }}
                                placeholder="Enter email" />
                        </div>

                        <div className="form-group">
                            <label >Password</label>
                            <input type="password" className="form-control mb-3"
                                onChange={(e) => {
                                    SetUserInfo({ ...userInfo, Password: e.target.value })
                                }}
                                placeholder="Password" />
                        </div>

                        <div className="form-group">
                            <label >Confirm Password</label>
                            <input type="password" className="form-control mb-3"
                                onChange={(e) => {
                                    SetUserInfo({ ...userInfo, ConfirmPassword: e.target.value })
                                }}
                                placeholder="Password" />
                        </div>

                        <div className="form-group">
                            <label >Phone Number</label>
                            <input type="tel" className="form-control mb-3"
                                onChange={(e) => {
                                    SetUserInfo({ ...userInfo, Phone: e.target.value })
                                }}
                                placeholder="Enter phone number" />
                        </div>
                        <div className="mb-3">
                            Already Registered ? <Link to='/log'>Login Here</Link>
                        </div>
                        <button type="submit" className="btn btn-success " onClick={onRegister}>Register</button>
                    </div>
                    <div className="col"></div>
                </div>
            </div>
        </div>
    )

}

export default Register