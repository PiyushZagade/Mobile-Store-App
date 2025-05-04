import { toast } from "react-toastify";
import { config } from "./config";
import axios from "axios";

export async function retrieveOrder(){
    try {
        const url=`${config.serverUrl}/orders/`

        const token=sessionStorage.getItem('token')
        const resp=await axios.get(url,{
            headers:{
                token:token
            }
        })

        return resp.data
        
    } catch (er) {
        toast.error(er)
    }
}

export async function deleteOrder(id){
    try {

        const url=`${config.serverUrl}/orders/${id}`
        const token=sessionStorage.getItem('token')
        const resp=await axios.delete(url,{
            headers:{
                token
            }
        })

        return resp.data

    } catch (err) {
        toast.error(err)
    }
}