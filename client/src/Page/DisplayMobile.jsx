import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { getMobiles } from '../services/mobile'
import { mobToDelete } from '../services/mobile'
import { config } from '../services/config'
import { mobContext } from '../App'
import SlideBar from '../Component/SlideBar'



function DisplayMobile() {
    
    const navigate = useNavigate()
    const [mobiles, setMobiles] = useState([])
    const { setMobId } = useContext(mobContext)

    async function getMobileList() {
        const result = await getMobiles()
        // console.log(result.d)
        if (result.status == 'success') {

            setMobiles(result.d)

        } else {
            toast.error(result.e)
        }
    }

    useEffect(() => {

        getMobileList()
    }, [])

    async function onUpdate(id,company,model,price,description,img) {
        setMobId({id,company,model,price,description,img})
        navigate('/upd')
     }
 
     async function onDelete(id) {
         const result =await mobToDelete(id)
         if(result.status=='success'){
             getMobileList()
             toast.success("Deleted Successfully")
         }else{
             toast.error(result.error)
         }
     }



    return (
        <div>
            <SlideBar/>
            <div className="container">
                <div className="row mt-2">
                    <div className="d-flex align-items-center justify-content-around mb-3 ">
                        <h1>Mobile Store</h1>

                    </div>
                    <hr />


                    {mobiles.map((mob, index) => {
                        return (
                            <div className='col-2' key={index}>
                                <div className="card" key={mob.mid}>
                                    <img className="card-img-top" src={`${config.serverUrl}/mobile/${mob.img}`} alt="Card image cap" />
                                    <div className="card-body">
                                        <h4 className="card-title">{mob.company}</h4>
                                        <p className="card-text">{mob.model}</p>
                                        <h5 className="card-title">{mob.price} </h5>
                                        <button type="button" className="btn btn-warning m-1" onClick={() => {
                                            onUpdate(mob.mid, mob.company,mob.model,mob.price,mob.description,mob.img)
                                        }} >Update</button>
                                        <button type="button" className="btn btn-danger" onClick={() => {
                                            onDelete(mob.mid)
                                        }} >Delete</button>
                                    </div>
                                </div>
                            </div>
                        )

                    })}


                </div>


            </div>
        </div>
    )
}

export default DisplayMobile
