//sudo npm install express 
//sudo npm install express-handlebars
const express = require('express')
const app =express()

//add body-parser to process POST data from forms
const bodyParser = require('body-parser')
//body-parser needs to be initialized
app.use(bodyParser.urlencoded({extended: true}))

//app.use(express.static("public"))


const expressHandlebars = require('express-handlebars')
app.engine('handlebars',expressHandlebars.engine({
    defaultLayout: 'main',
}))
app.set('view engine','handlebars')

//import the handler files, functions
const handler = require('./lib/handler')

const PORT = process.env.port || 3000

app.get("/",(req,res)=>{
    res.render('page',{req})
})


app.post("/process",(req,res)=>{
    res.send('got post')
})

app.get("/process",(req,res)=>{
    console.log(req.query)
})

app.get('/newsletter-signup', handler.newsletterSignup)

app.post("/newsletter-signup/process", handler.newsletterSignupProcess)

app.get('/newsletter/list', handler.newsletterSignupList)

app.get('/newsletter/thankyou',(req,res)=>{
    res.render('thankyou')
})
//newsletter/details/?email=adiofjaodisfjsioajdifoa@ijaodf.com
app.get('/newsletter/details/:email', handler.newsletterUser)
app.get('/newsletter/delete/:email', handler.newsletterDelete)

app.use((request,response)=>{
    response.status(404)
    response.render('404')
})
app.use((error,request,response,next)=>{
    console.log(error.message)
    response.status(500)
    response.render('500')
})

app.listen(PORT, ()=>{
    console.log(`express is running on http://localhost:${PORT}`)
    console.log(`Press ctrl-c to terminate`)
})