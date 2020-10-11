const express = require('express')

const app = express()

const http = require('http')

const server = http.Server(app)
const bodyParser = require('body-parser')

server.listen(3000)

app.set('views','./views')
app.set('view engine', 'ejs')
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true ,limit:'50mb'}));
app.use(express.static('./public'))

require('./routes/categoriesRoutes')(app)
require('./routes/adminRoutes/index')(app)
