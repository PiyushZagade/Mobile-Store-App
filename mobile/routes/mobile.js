const express=require('express')
const router=express.Router()
const pool=require('../db/mysql2')
const result=require('../utils/result')
const multer=require('multer')
const upload=multer({dest:'images/'})
const fs=require('fs')


router.post('/add',upload.single('icon'),(req,res)=>{
    const newFileName=req.file.filename+ '.jpg'
    fs.rename(req.file.path,`${req.file.destination}${newFileName}`,(e)=>{
        if (e) {
            console.error('File rename failed:', e)
            return res.send(result.createResult(e))
        }
     })
    const {company,model,price,description}=req.body
    const sql= `insert into mobile(company,model,price,img,description) values(?,?,?,?,?)`
    pool.query(sql,[company,model,price,newFileName,description],(e,d)=>{
        res.send(result.createResult(e,d))
    })
})

router.get('/',(req,res)=>{
    const sql=`select * from mobile`
    pool.query(sql,(e,d)=>{
        res.send(result.createResult(e,d))
    })
})

router.put('/update',upload.single('icon'),(req,res)=>{
    const newFileName=req.file.filename+ '.jpg'
    fs.rename(req.file.path,`${req.file.destination}${newFileName}`,(e)=>{
        if (e) {
            console.error('File rename failed:', e)
            return res.send(result.createResult(e))
        }
     })

    const {mid,company,model,price,description}=req.body
    // console.log(mid)
    const sql =`update mobile set company=?, description=? ,model= ?, price=? , img=? where mid=?`
    pool.query(sql,[company,description,model,price,newFileName,mid],(e,d)=>{
        res.send(result.createResult(e,d))
    })
})

router.delete('/:id',(req,res)=>{
    const sql ='delete from mobile where mid=?'
    pool.query(sql,[req.params.id],(e,d)=>{
        res.send(result.createResult(e,d))
    })
})


module.exports=router