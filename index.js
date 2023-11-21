const { response } = require('express')
const express = require('express')
const exphbs = require('express-handlebars')
const mysql = require('mysql2')

const app = express()

app.engine('handlebars', exphbs.engine())
app.set('view engine', 'handlebars')

app.use(express.static("public"))

app.use(express.urlencoded({
    extended: true
}))

app.use(express.json())

// rotas
app.post('/register/save', (req, res) => {
   const {title, pageqty, descricao} = req.body

   const book = {
        title,
        pageqty,
        descricao
   }

   const query = `
        insert into books (title, pageqty, descricao)
        values ('${title}', '${pageqty}', '${descricao}')
   `

   conn.query(query, (error) => {
    if (error) {
        console.log(error)
        return
    }

   })
   
   res.redirect('/')
   
})

app.get('/register', (req, res) => {
    res.render('register')
})

app.get('/book/:id', (req, res) => {
    const id = req.params.id

    const sql = `
        select * from books
        where id = ${id}
    `

    conn.query(sql, (error, data) => {
        if (error) {
            return console.log(error)
        }

        const book = data[0]

        res.render('book', {book})
    })
})


app.get('/delete/:id', (req, res) => {
    const id = req.params.id

    const sql = `
        select * from books
        where id = ${id}
    `

    conn.query(sql, (error, data) => {
        if (error) {
            return console.log(error)
        }

        const book = data[0]

        res.render('delete', {book})
    })
})

app.post('/delete/:id/delete', (req, res) => {
    const id = req.params.id

    const sql = `
        delete from books
        where id = ${id};
    `

    conn.query(sql, (error) => {
        if (error) {
            return console.log(error)
        }

        res.redirect('/')
    })

})

app.get('/update/:id', (req, res) => {
    const id = req.params.id

    const sql = `
        select * from books
        where id = ${id}
    `

    conn.query(sql, (error, data) => {
        if (error) {
            return console.log(error)
        }

        const book = data[0]

        res.render('update', {book})
    })
})

app.post('/update/save', (req, res) => {
    const {id, title, pageqty, descricao} = req.body

    const query = `
        update books
        set title = '${title}', pageqty = '${pageqty}', descricao = '${descricao}'
        where id = ${id}
    `

    conn.query(query, (error) => {
    if (error) {
        console.log(error)
        return
    }

    })
   
    res.redirect('/')
})

app.get('/', (req, res) => {
    const sql = 'select * from books'

    conn.query(sql, (error, data) => {
        if (error) {
            return console.log(error)
        }
        
        const books = data
      
        res.render('home', {books})
    
    })
})

const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'node-mysql',
    port: 3306
})

conn.connect((error) => {
    if (error){
        console.log(error)
        return
    }

    console.log('conectado ao mysql')

    app.listen(3000)
})