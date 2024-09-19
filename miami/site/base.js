const express = require('express')
//create the express server inside a variable called app
const app =express()
//import a package for handlerbars
const expressHandlebars = require('express-handlebars')
//make express use the handlerbars template engine
app.engine('handlebars',expressHandlebars.engine({
    defaultLayout: 'main',
}))
app.set('view engine','handlebars')

const PORT = process.env.port || 3000
//console.log(process.env)

//process routes before error 
app.get('/',(request,response)=>{
    response.render('home')
})
app.get('/about',(request,response)=>{
    response.render('about')
})
app.get('/food',(request,response)=>{
    response.render('home')
})
app.get('/hotel',(request,response)=>{
    response.type('text/plain')
    response.send('Miami Hotel')
})
app.get('/beach',(request,response)=>{
    response.type('text/plain')
    response.send('Miami Beaches')
})
//this triggers a server error
app.get('/history',(req,res)=>{
    response.type('text/plain')
    response.send('History of Miami')
})

//handle the error first 
//NOT FOUND
app.use((request,response)=>{
    response.status(404)
    response.render('404')
})
//SERVER ERROR :(
app.use((error,request,response,next)=>{
    console.log(error.message)
    response.status(500)
    response.render('500')
})

app.listen(PORT, ()=>{
    console.log(`express is running on http://localhost:${PORT}`)
    console.log(`Press ctrl-c to terminate`)
})