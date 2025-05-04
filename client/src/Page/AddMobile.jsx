import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { mobToAdd } from '../services/mobile'
import SlideBar from '../Component/SlideBar'


function AddMobile() {

    const [img, setImg] = useState(null)
    const [mob,setMob]=useState({
        company: '',
        model: '',
        price: '',
        description:''
    })

    const navigate =useNavigate()
    async function onAddMob(){
        if(mob.company.length==0){
            toast.error('Company cannot be empty')
        }else if(mob.model.length==0){
            toast.error('Model cannot be empty')
        }
        else if(mob.price.length==0){
            toast.error('Price cannot be empty')
        }
        else if(mob.description.length==0){
            toast.error('Description cannot be empty')
        }
        else if(!img){
            toast.error('Image cannot be empty')
        }else{
            //validation part here
            const {company,model,price,description}=mob
            const result=await mobToAdd(company,model,price,description,img)
        
            if(result.status=='success'){
                navigate('/show')
                toast.success("Mobile Added Successfully")
            }else{
                toast.error(result.error)
            } 
        }
    }

  return (
    <div>
      <SlideBar/>
      <div className="container">
        <div className="container">
        <div className="container">
        <h1 style={{ textAlign: 'center ', margin: '10px' }}>Add Mobiles</h1>
        <hr />
        <div className="row">
          <div className="col"></div>
          <div className="col-5">

            <div className="form-group mb-3">
              <label >Company</label>
              <input type="text" className="form-control" placeholder="Enter Company Name"
                onChange={(e) => {
                    setMob({ ...mob, company: e.target.value })
                }}
              />
            </div>

            <div className="form-group mb-3">
              <label >Model</label>
              <input type="text" className="form-control" placeholder="Enter Model Name"
                onChange={(e) => {
                    setMob({ ...mob, model: e.target.value })
                }}
              />
            </div>
            <div className="form-group mb-3">
              <label >Price</label>
              <input type="tel" className="form-control" placeholder="Enter Price"
                onChange={(e) => {
                    setMob({ ...mob, price: e.target.value })
                }}
              />
            </div>
            <div class="form-group mb-3">
              <label >Description</label>
              <textarea class="form-control" rows="4"
                onChange={(e) => {
                    setMob({ ...mob, description: e.target.value })
                }}
              ></textarea>
            </div>

            <div className="form-group mb-3">
              <label >Add Image</label>
              <input type="file" className="form-control"
                onChange={(e) => {
                    setImg(e.target.files[0])
                }}
              />
            </div>

            <div className='d-flex justify-content-center align-items-center'>
              <button type="button" class="btn btn-primary m-1" onClick={onAddMob}  >Add Mobile</button>

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

export default AddMobile
