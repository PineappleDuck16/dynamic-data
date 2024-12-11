const express = require('express')
const app = express()


const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({extended: true}))

const expressHandlebars = require('express-handlebars')
app.engine('handlebars',expressHandlebars.engine({
    defaultLayout: 'main',
}))
app.set('view engine','handlebars')
const handler = require('./lib/handler')

const PORT = process.env.port || 3000

app.use(express.static('public'))

app.use((req, res, next) => {
    const orderList = require('./data/order.json');
    res.locals.cartCount = orderList.orders.length;
    next();
});

app.get("/",(req,res)=>{
    const data=require("./data/home-data.json")
    res.render('landing',{
        data
    })
})

app.get("/xr",(req,res)=>{
    const data = require("./data/xr-data.json")
    data.category = 'xr';
    res.render('categories',{data})
})
app.get("/game",(req,res)=>{
    const data = require("./data/game-data.json")
    data.category = 'game';
    res.render('categories',{data})
})
app.get("/uiux",(req,res)=>{
    const data = require("./data/uiux.json")
    data.category = 'uiux';
    res.render('categories',{data})
})
app.get("/about", (req, res) => {
    const data = require("./data/about.json")
    res.render('categories', {data})
})

// modify code
app.get("/work/:category/:id", (req, res) => {
    let data;
    switch(req.params.category) {
        case 'xr':
            data = require("./data/xr-data.json");
            break;
        case 'game':
            data = require("./data/game-data.json");
            break;
        case 'uiux':
            data = require("./data/uiux.json");
            break;
        default:
            return res.status(404).render('404');
    }
    
    const work = data.works[req.params.id];
    if (!work) {
        return res.status(404).render('404');
    }
    // Get related works from the same category
    const relatedWorks = data.works
        .map((w, index) => ({...w, id: index}))
        .filter((w, index) => index !== parseInt(req.params.id))
        .slice(0, 4); // Get up to 4 related works
    
    res.render('item', { 
        work,
        relatedWorks,
        category: req.params.category
    });
});
// modify code









//newsletter=>cart code
app.post("/process",(req,res)=>{
    res.send('got post')
})

app.get("/process",(req,res)=>{
    console.log(req.query)
})
app.post("/buyerinfo/process", handler.buyerinfoProcess)


app.get("/cart",(req,res)=>{
    const buyerdata = require("./data/buyerinfo.json");
    const orderdata = require("./data/order.json");
    res.render('cart',{buyerdata,orderdata})
})
app.get('/cart/thankyou',(req,res)=>{
    res.render('thankyou')
})







//order code
app.post("/order/add", handler.addToOrder)

//order code


app.use((request,response)=>{
    response.status(404)
    response.render('404')
})
app.use((error,request,response,next)=>{
    console.log(error.message)
    response.status(500)
    response.render('500')
})

app.get('/order/delete/:id', handler.orderdelete);

app.listen(PORT, ()=>{
    console.log(`express is running on http://localhost:${PORT}`)
    console.log(`Press ctrl-c to terminate`)
})