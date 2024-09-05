var name = "Hao"
var age = 26
let lastName = "Zhong"
const year = 2024
//JavaScript Object Notation AA JSON; ex printer.color
var printer = {
    color:"black",
    size:"small",
    price:29.99
}

const http = require('http')

const PORT = process.env.PORT || 3000

const server = http.createServer((request,response)=>{
    console.log("*********************************")
    console.log("*********************************")

    console.log(request.url)
    console.log(request.method) //GET POST PUT DELETE
    //GET => READ OPERATION OF A DATABASE
    //POST => CREATE "" ""
    //PUT => UPDATE
    //DELETE => DELETE

    //How to respond to requests
    //ROUTING
    if(request.url == "/"){
        response.writeHead(200,{'Conten-Type':'text/plain'})
        response.end("Home Page")  
        //execute the statement
    }
    else if(request.url == "/contact"){
        response.writeHead(200,{'Conten-Type':'text/plain'})
        response.end("Contact Page")  
        //execute the statement
    }
    else if(request.url == "/about"){
        response.writeHead(200,{'Conten-Type':'text/plain'})
        response.end("About Page")  
        //execute the statement
    }
    else if(request.url == "/gallery"){
        response.writeHead(200,{'Conten-Type':'text/HTML'})
        response.end("<html><head><title>Page Title</title></head><body><h1>MY first HTML response</h1></body></html>")  
        //execute the statement
    } else{
        response.writeHead(400, {"Content-Type" : "Text/Plain"})
        response.end("Page not found error 400")
    }
    
    //Basic Conditions
    /**
     * Equals: if a == b (twice because = by itself is an assignment operator)
     * Not Equal: if a !=b
     * Greater than: if a>b
     * Less than: if a<b
     * Greater than or equal: if a>=b
     * Less than or equal: if a<=b
     */

    console.log("Responding to request")  
    
    console.log("*********************************")
    console.log("*********************************")
})

server.listen(PORT, () => console.log(`server started on port http://localhost:${PORT} press Ctrl+C to terminate`))