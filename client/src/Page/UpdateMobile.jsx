import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { mobContext } from '../App'
import { mobToUpdate } from '../services/mobile'
import SlideBar from '../Component/SlideBar'


function UpdateMobile() {
    const { mobId } = useContext(mobContext)
    const [img, setImg] = useState(null)
    const [mob, setMob] = useState({
        company: '',
        model: '',
        price: '',
        description: ''
    })

    const navigate = useNavigate()


    async function onCancel() {
        navigate(-1);
    }

    async function onUpdMob() {
        if (mob.company.length == 0) {
            toast.error('Company cannot be empty')
        } else if (mob.model.length == 0) {
            toast.error('Model cannot be empty')
        }
        else if (mob.price.length == 0) {
            toast.error('Price cannot be empty')
        }
        else if (mob.description.length == 0) {
            toast.error('Description cannot be empty')
        }
        else if (!img) {
            toast.error('Image cannot be empty')
        } else {
            //validation part here
            const { company, model, price, description } = mob
            const result = await mobToUpdate(mobId.id, company, model, price, description, img)
            

            if (result.status == 'success') {
                navigate('/show')
                toast.success("Mobile Updated Successfully")
            } else {
                toast.error(result.error)
            }
        }
    }



    return (
        <div>
            <SlideBar />
            <div className="container">
                <div className="container">
                    <div className="container">
                        <h1 style={{ textAlign: 'center ', margin: '10px' }}>Update Mobile</h1>
                        <hr />
                        <div className="row">
                            <div className="col"></div>
                            <div className="col-5">

                                <div className="form-group mb-3 d-flex align-items-center justify-content-center">
                                    <label className='w-25'>Mob Id</label>
                                    <input type="text" className="form-control w-50 bg-warning" readOnly placeholder={mobId.id} />
                                </div>

                                <div className="form-group mb-3">
                                    <label >Company</label>
                                    <input type="text" className="form-control" placeholder={mobId.company}
                                        onChange={(e) => {
                                            setMob({ ...mob, company: e.target.value })
                                        }}
                                    />
                                </div>

                                <div className="form-group mb-3">
                                    <label >Model</label>
                                    <input type="text" className="form-control" placeholder={mobId.model}
                                        onChange={(e) => {
                                            setMob({ ...mob, model: e.target.value })
                                        }}
                                    />
                                </div>
                                <div className="form-group mb-3">
                                    <label >Price</label>
                                    <input type="tel" className="form-control" placeholder={mobId.price}
                                        onChange={(e) => {
                                            setMob({ ...mob, price: e.target.value })
                                        }}
                                    />
                                </div>
                                <div class="form-group mb-3">
                                    <label >Description</label>
                                    <textarea class="form-control" rows="4"
                                        placeholder={mobId.description}
                                        onChange={(e) => {
                                            setMob({ ...mob, description: e.target.value })
                                        }}
                                    ></textarea>
                                </div>

                                <div className="form-group mb-3">
                                    <label >Add Image</label>
                                    <div className="d-flex align-items-center ">
                                        <input type="file" className="form-control w-75"
                                            placeholder={mob.img}
                                            onChange={(e) => {
                                                setImg(e.target.files[0])
                                            }}
                                        />
                                        <img
                                            src={`http://localhost:8080/mobile/${mobId.img}`}
                                            alt="Current" className='ms-3'
                                            style={{ height: "50px",  padding: "1px" }}
                                        />
                                    </div>
                                </div>

                                <div className='d-flex justify-content-center align-items-center'>
                                    <button type="button" class="btn btn-warning m-1" onClick={onUpdMob}  >Update</button>
                                    <button type="button" class="btn btn-danger m-1" onClick={onCancel}  >Cancel</button>

                                </div>


                            </div>
                            <div className="col"></div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default UpdateMobile
