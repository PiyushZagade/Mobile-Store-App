import React, { useContext, useEffect, useState } from 'react'

import { retrieveOrder } from '../services/orders'
import { deleteOrder } from '../services/orders'
import { toast } from 'react-toastify'
import SlideBar from '../Component/SlideBar'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../App'


function Orders() {
const { user } = useContext(AuthContext)
    
    const [info, setInfo] = useState([])
    const [tPrice,setTPrice]=useState(0)


    async function getOrders() {
        const result = await retrieveOrder()
        if (result.status == 'success') {
 
            setInfo(result.d)
            // console.log(result.d)
            let total=0; 
            for(const p of result.d){
                total=total+p.price;
                // console.log(total)  
            } 

            setTPrice(total);
        } else {
            toast.error(result.e)
        }
    }

  


    async function onDelPurchase(id){
        const result=await deleteOrder(id);
        if(result.status=='success'){
            getOrders()
            toast.success('Deleted Successfully')

        }else{
            toast.error(result.e)
        }
    }

    const navigate =useNavigate()

    useEffect(() => {
        if(!user){
            navigate('/')
        }
        getOrders()
    }, [user])

    return (
        <div>
            <SlideBar/>
            <div className="container mt-3">
                <div className=" d-flex  justify-content-around align-items-center">
                    <h1 style={{ textAlign: "center", margin: '5px' }}>Mobile Orders</h1>
                </div>

                <hr />
                <div className="row">

                    {info.length==0 &&(
                        <h3 style={{ textAlign: "center", margin: '5px' }} >No orders Currently</h3>
                    )}

                    { info.length>0 && ( 
                        <table className="table text-center">
                        <thead className="thead-light ">
                            <tr>
                                <th scope="col">Order Id</th>
                                <th scope="col">Company</th>
                                <th scope="col">Model</th>
                                <th scope="col">Price</th>
                                <th scope="col">Actions</th>
                            </tr>
                        </thead>
                        <tbody >
                            {info.map((list,index)=>{
                                return (
                                    <tr key={index}>
                                        <td scope="row">#MO{list.oid}</td>
                                        <td>{list.company}</td>
                                        <td>{list.model}</td>
                                        <td>Rs {list.price}</td>
                                       
                                        
                                        <td>
                                            <button type="button" className="btn btn-outline-danger" onClick={()=>{
                                                onDelPurchase(list.oid)
                                            }}>Delete</button>
                                        </td>
                            
                                    </tr>
                                )
                            })}
                        </tbody>
                        <tfoot>
                            <tr>
                                <td colSpan={3} style={{textAlign:'center'}}> <b>Total Bill </b></td>
                                <td> <b>Rs {tPrice}</b></td>
                            </tr>
                        </tfoot>
                    
                    </table>
                     )}

                </div>
            </div>
        </div>
    )
}

export default Orders
