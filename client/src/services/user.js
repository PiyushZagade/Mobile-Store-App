import axios from 'axios'
import { toast } from 'react-toastify'
import { config } from './config'

export async function userRegister(name,email,password,phone) {
    try {
        const url=`${config.serverUrl}/user/register`
        const body={
            name,
            email,
            password,
            phone
        }
        // console.log(body)
        const resp=await axios.post(url,body)

        return resp.data
    } catch (ex) {
        toast.error(ex)
    } 
}

export async function userLogin(email,password){
    try{
        const url= `http://localhost:8080/user/login`
        const body={
            email,password
        }

        const resp=await axios.post(url,body)
        return resp.data

    }catch(ex){
        toast.error(ex)
    }
}



