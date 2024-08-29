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
    console.log(request)
    console.log("Responding to request")
    response.writeHead(200,{'Conten-Type':'text/plain'})
    response.end('Hello World')
})

server.listen(PORT, () => console.log(`server started on PORT ${PORT} press Ctrl+C to terminate`))