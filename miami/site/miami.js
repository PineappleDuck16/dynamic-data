const express = require('express')
//create the express server inside a variable called app
const app =express()
//soecify static routes
app.use(express.static("public"))

//import a package for handlerbars
const expressHandlebars = require('express-handlebars')
//make express use the handlerbars template engine
app.engine('handlebars',expressHandlebars.engine({
    defaultLayout: 'main',
}))
app.set('view engine','handlebars')

const PORT = process.env.port || 3000
//console.log(process.env)

//Import app-wide data
const gallery = require("./data/gallery.json") 

//process routes before error 
app.get('/',(request,response)=>{
    console.log("gallery")
    const data=require("./data/home-data.json")
    response.render('landing',{
        gallery,
        data
    })
})
app.get('/artdeco',(request,response)=>{
    const data=require("./data/artdeco-data.json")
    response.render('landing',{
        gallery,
        data
    })
})
app.get('/food',(request,response)=>{
    const data=require("./data/food-data.json")
    response.render('landing',{
        gallery,
        data
    })
})
app.get('/history',(request,response)=>{
    const data=require("./data/history-data.json")
    response.render('landing',{
        gallery,
        data
    })
})
app.get('/shopping',(request,response)=>{
    const data=require("./data/shopping-data.json")
    response.render('landing',{
        gallery,
        data
    })
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