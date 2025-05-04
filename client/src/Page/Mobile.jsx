import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { getMobiles } from '../services/mobile'
import { purchaseMobile } from '../services/mobile'
import { AuthContext } from '../App'
import { config } from '../services/config'
import SlideBar from '../Component/SlideBar'


function mobile() {
    const navigate = useNavigate()
    const [mobiles, setMobiles] = useState([])

    // const [user] =useContext(AuthContext)
    const { user } = useContext(AuthContext)


    async function onPurchase(id) {

        if(!user){
            toast.warning("Please login to purchase")
        navigate('/log')
        return
        }

        const result = await purchaseMobile(id)
        if (result.status == 'success') {
            toast.success("Mobile Added to Orders")
        } else {
            toast.warning(result.e)
        }
    }


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



    return (
        <div>
        <SlideBar/>
            <div className="container">
                <div className="row">
                    
                    <h1 style={{ textAlign: 'center ', margin: '10px' }}>Mobile Store</h1>

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
                                        
                                        <button type="button" className="btn btn-success" onClick={() => {
                                            onPurchase(mob.mid)
                                        }} >Purchase</button>
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

export default mobile
