const express = require('express')
const router = express.Router()
const pool = require('../db/mysql2')
const result = require('../utils/result')


//retrieved all the mobile details from mobile tables into order table
router.get('/', (req, res) => {
    const sql = `SELECT orders.oid, mobile.company, mobile.model, mobile.price 
        FROM orders 
        JOIN mobile ON orders.mid = mobile.mid 
        WHERE orders.uid = ?    order by oid `
    pool.query(sql, [req.headers.uid], (e, d) => {
        res.send(result.createResult(e, d))
    })
})

//added mobile(mid) to orders table by the specified user
router.post('/add/:id', (req, res) => {

    const check = 'select * from orders where uid=? and mid=?'
    pool.query(check, [req.headers.uid, req.params.id], (e, d) => {
        if (e) {
            return res.send(result.createErrorResult(e))
        }

        if (d.length > 0) {
            return res.send(result.createErrorResult("You have already Purchased "))
        }

        const sql = `insert into orders(mid,uid) values(?,?)`
        console.log(req.headers.uid)
        pool.query(sql, [req.params.id, req.headers.uid], (e, d) => {
            res.send(result.createResult(e, d))
        })
    })

})

//deleting the order by order id by that user
router.delete('/:id', (req, res) => {
    const sql = `delete from orders where oid=? and uid=?`
    pool.query(sql, [req.params.id, req.headers.uid], (e, d) => {
        res.send(result.createResult(e, d))
    })
})

module.exports = router