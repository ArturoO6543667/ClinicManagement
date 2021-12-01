const express = require('express')
const ServeStatic = require('serve-static')
const path = require('path')
const serveStatic = require('serve-static')

const app  = express()

app.use('/', serveStatic(path.join(__dirname,'/dist')))

const port = process.env.PORT || 8080
app.listen(port)

console.log(port)