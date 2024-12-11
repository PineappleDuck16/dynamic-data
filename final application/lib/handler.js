//to write or create, we need node's file system fs
const fs = require('fs')
//create a variable to store users that sign up 
let eList = require('../data/buyerinfo.json');
if (!eList.users) {
    eList = { users: [] };
}


let orderList = require('../data/order.json')
if (!orderList.orders) {
    orderList = { orders: [] };
}



//create your functions
exports.buyerinfo = (req,res) =>{
    res.render('cart', {csrf: 'supersecret'})
}
exports.buyerinfoProcess = (req,res) =>{
    console.log(req.body)
    var newUser ={
        "firstname": req.body.firstname,
        "lastname": req.body.lastname,
        "address": req.body.address,
        "city": req.body.city,
        "state": req.body.state,
        "zip": req.body.zip,
        "email": req.body.email,
        "phone": req.body.phone
    }
    console.log('Cleaned user')
    console.log(newUser)
//once we have a clean user information, we add the to the eList
eList.users.push(newUser)
//we need to turn the eList values back into text in order to write 
var json = JSON.stringify(eList)
fs.writeFileSync('./data/buyerinfo.json', json, 'utf8', ()=>{
    console.log("finished writing file")
})

console.log('current eList')
console.log(eList)

//res.render('thankyou')
res.redirect(303, "/cart/thankyou")
}

exports.addToOrder = (req, res) => {
    console.log('Adding item to order:', req.body);
    
    const Order = {
        "id": Date.now().toString(),
        "title": req.body.title,
        "duration": req.body.duration,
        "description": req.body.description,
        "image": req.body.image,
        "category": req.body.category,
        "timestamp": new Date().toISOString()
    }

    // Add to orderList
    orderList.orders.push(Order);

    // Write to file
    var json = JSON.stringify(orderList)
    fs.writeFileSync('./data/order.json', json, 'utf8', () => {
        console.log("finished writing order to file")
    })

    console.log('Current orderList:', orderList);
    
    res.redirect(303, "/cart");
}

exports.orderlist = (req,res) =>{
    res.render('orderlist',{orderdata:orderList.orders})
} 
exports.orderdata = (req,res) =>{
    var orderdeatil = orderList.orders.filter((order)=>{
        return order.title == req.params.title
    })
    if (orderdeatil.length === 0) {
        return res.status(404).send('Order not found');
    }
    res.render('orderdetails',{orderdata:orderdeatil})
}


exports.orderdelete = (req, res) => {
        
        newOrder.orders = orderList.orders.filter((order) => {
            return order.id != req.params.id
        });
        
        var json = JSON.stringify(newOrder);
        fs.writeFileSync('./data/order.json', json, 'utf8');
        
    
        res.redirect(303, "/cart");
    
}