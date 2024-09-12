const http = require('http')
const port = process.env.PORT
const server = http.createServer((request,response)=> {
    const path = request.url;
    switch(path){
        case '':
        case '/':
            
    }
}
)
