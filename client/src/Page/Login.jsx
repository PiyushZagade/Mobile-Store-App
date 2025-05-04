import React, { useContext, useState } from 'react'
import {toast} from 'react-toastify'
import { Link, useNavigate } from "react-router-dom"
import {userLogin} from "../services/user"
import { AuthContext } from '../App'

function Login() {

  const[userInfo,SetUserInfo]=useState({
    Email:'',
    Password:''
  })

  const {setUser}=useContext(AuthContext)


  const navigate=useNavigate()

  async function onLogin(){
    //validation
    if(userInfo.Email.length==0){
      toast.error("Email can't be empty")
    }else if(userInfo.Password.length==0){
      toast.error("Password can't be empty")
    }else{
     

      const {Email,Password}=userInfo
      
      const result= await userLogin(Email,Password)

      // console.log(result.d)
      
      if(result.status=='success'){
        toast.success("Welcome to mobile Store")
        const {token,name,phoneno,email,password}=result.d
        sessionStorage.setItem('token',token)
        sessionStorage.setItem('name',name)
      
        setUser({
          token:token,
          name:name,
          email:email,
          password:password,
          phoneno:phoneno
        })

        navigate('/')
        
      }else{
        toast.error(result.error)
      }

    }

    
  }


  return (
    <div>
      <div className="page-header mt-4">
        <h1 style={{ textAlign: "center" }}>Login</h1>

        <div className="row m-3">
          <div className="col"></div>
          <div className="col-5">

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

            <div className="mb-3">
              Didn't Registered? <Link to='/reg'>Register Here</Link>
            </div>
            <button type="submit" className="btn btn-success " onClick={onLogin}>Login</button>
          </div>
          <div className="col"></div>
        </div>
      </div>
    </div>
  )
}

export default Login
