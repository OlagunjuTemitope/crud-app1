const express = require('express')
const bodyParser = require('body-parser')
const mysql = require('mysql')


const app = express()
const port = process.env.PORT || 7000

app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())

//MySQL
const pool = mysql.createPool({
    connectionLimit:  10,
    host:       'localhost',
    user:       'root',
    password:   '',
    database:   'nodejs_pizza'
})


//Get all pizza
app.get('',(req, res) =>{

    pool.getConnection((err, connection) => {
        if(err) throw err
        console.log(`connected as id ${connection.threadId}`)

        connection.query('SELECT * from pizza', (err, rows) => {
            connection.release()

            if (!err){
                res.send(rows)
            } else{
                console.log(err)
            }
        })

    })
})

  
//Get a pizza by ID
app.get('/:id',(req, res) =>{

    pool.getConnection((err, connection) => {
        if(err) throw err
        console.log(`connected as id ${connection.threadId}`)

        connection.query('SELECT * from pizza WHERE id = ?',[req.params.id], (err, rows) => {
            connection.release()

            if (!err){
                res.send(rows)
            } else{
                console.log(err)
            }
        })

    })
})

//Delete a records / pizza
app.delete('/:id',(req, res) =>{

    pool.getConnection((err, connection) => {
        if(err) throw err
        console.log(`connected as id ${connection.threadId}`)

        connection.query('DELETE from pizza WHERE id = ?',[req.params.id], (err, rows) => {
            connection.release()

            if (!err){
                res.send(`Pizza with the Record ID: ${req.params.id} has been removed`)
            } else{
                console.log(err)
            }
        })

    })
})

//Add a record / pizza
app.post('',(req, res) =>{

    pool.getConnection((err, connection) => {
        if(err) throw err
        console.log(`connected as id ${connection.threadId}`)
        const params = req.body
        connection.query('INSERT INTO pizza SET ?', params, (err, rows) => {
            connection.release()

            if (!err){
                res.send(`pizza with the name: ${params.id} has been added.`)
            } else{
                console.log(err)
            }
        })
        console.log(req.body)
    })
})
//Update a record / pizza
app.put('',(req, res) =>{

    pool.getConnection((err, connection) => {
        if(err) throw err
        console.log(`connected as id ${connection.threadId}`)

        const {id, name, tagline, description, image} = req.body
        connection.query('UPDATE pizza SET name = ?, tagline = ? WHERE id = ?', [name, tagline, id], (err, rows) => {
            connection.release()

            if (!err){
                res.send(`pizza with the name:  has been added.`)
            } else{
                console.log(err)
            }
        })
        console.log(req.body)
    })
})





//hosting on environment port or 5000
app.listen(port, () => console.log(`listen on port ${port}`))

