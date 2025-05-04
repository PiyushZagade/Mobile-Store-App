import { toast } from "react-toastify"
import { config } from "./config"
import axios from "axios"

export async function getMobiles() {
    try {
        const url = `${config.serverUrl}/mobile/`

        const token = sessionStorage.getItem('token')
        const resp = await axios.get(url, {
            headers: {
                token
            }
        })

        return resp.data

    } catch (ex) {
        toast.error(ex)
    }
}

export async function purchaseMobile(id) {
    try {
        const url = `${config.serverUrl}/orders/add/${id}`
        const token = sessionStorage.getItem('token')

        const body = {
            id
        }
        const resp = await axios.post(url, body, {
            headers: {
                token
            }
        })

        return resp.data;

    } catch (err) {
        toast.error(err)
    }
}


export async function mobToAdd(company, model, price, description, img) {

    try {
        const url = `${config.serverUrl}/mobile/add`
        const body = new FormData()
        body.append('company', company)
        body.append('model', model)
        body.append('price', price)
        body.append('description', description)
        body.append('icon', img)
        const token = sessionStorage.getItem('token')

        const response = await axios.post(url, body, {
            headers: {
                token,
            },
        })

        console.log(img)
        console.log(response)

        return response.data

    } catch (error) {
        toast.error(error)
    }

}

export async function mobToDelete(id){
    try {
        const url=`${config.serverUrl}/mobile/${id}`
        
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

export async function mobToUpdate(mid,company,model,price,description,img){

    try {
    
        const url=`${config.serverUrl}/mobile/update`

        const body = new FormData()
        body.append('mid', mid)
        body.append('company', company)
        body.append('model', model)
        body.append('price', price)
        body.append('description', description)
        body.append('icon', img)
        
    
        
        const token=sessionStorage.getItem('token')

        const resp=await axios.put(url,body,{
            headers:{
                token,
                
            }
        })
       console.log(body)
      
        return resp.data
    } catch (err) {
        toast.error(err)
    }
}
