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

app.post('/register/save', (req, res) => {
   const {title, pageqty} = req.body

   const book = {
        title,
        pageqty
   }

   const query = `
        insert into books (title, pageqty)
        values ('${title}', '${pageqty}')
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