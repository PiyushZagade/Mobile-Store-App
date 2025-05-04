const express = require('express')
const router = express.Router()
const pool = require('../db/mysql2')
const result = require('../utils/result')
const cryptojs = require('crypto-js')
const jwt = require('jsonwebtoken')
const config = require('../utils/config')

router.post('/register', (req, res) => {
    const { name, email, password, phoneno } = req.body
    const encryptedpassword = String(cryptojs.SHA256(password))
    const sql = `insert into user(name,email,password,phoneno) values(?,?,?,?)`
    pool.query(sql, [name, email, encryptedpassword, phoneno], (e, d) => {
        res.send(result.createResult(e, d))
    })
})

router.post('/login', (req, res) => {
    const { email, password } = req.body
    const encryptedpassword = String(cryptojs.SHA256(password))
    const sql = `select * from user where email=? and password=?`
    pool.query(sql, [email, encryptedpassword], (e, d) => {
        if (d) {
            if (d.length != 0){
                // console.log(d[0].uid);
                const payload={
                    uid : d[0].uid

                }

                const token =jwt.sign(payload,config.secret)
                const body={
                    token:token,
                    name:d[0].name,
                    email:d[0].email,
                    password:d[0].password,
                    phoneno:d[0].phoneno
                }
                res.send(result.createSuccessResult(body))
            }else{
                res.send(result.createErrorResult("Invalid email or password "))
            }
        } else {
            res.send(result.createErrorResult(e))
        }
    })
})

router.put('/update',(req,res)=>{         
    const {name,phoneno}=req.body
    const sql =`update user set name=?, phoneno=? where uid=?`
    // console.log(req.headers.uid)
    pool.query(sql,[name,phoneno,req.headers.uid],(e,d)=>{
        res.send(result.createResult(e,d))
    })
})

router.get('/',(req,resp)=>{
    const sql=`select * from user`;
    pool.query(sql,(e,d)=>{
        resp.send(result.createResult(e,d))
    })
})


router.delete('/del',(req,res)=>{
    const sql=`delete from user where uid=?`
    console.log(req.headers.uid)
    pool.query(sql,[req.headers.uid],(e,d)=>{
        res.send(result.createResult(e,d))
    })
})





module.exports = router