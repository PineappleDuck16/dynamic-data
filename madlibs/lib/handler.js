//exports.functionName = functionName

// exports.functionName = (log) => { 
   
// }


//create a variable to store users that sign up 
let eList = require('../data/emails.json')
//to write or create, we need node's file system fs
const fs = require('fs')



//create your functions
exports.newsletterSignup = (req,res) =>{
    res.render('newsletter-signup', {csrf: 'supersecret'})
}
exports.newsletterSignupProcess = (req,res) =>{
    console.log(req.body)
    var newUser ={
        "firstname": req.body.firstname,
        "lastname": req.body.lastname,
        "address": req.body.address,
        "city": req.body.city,
        "state": req.body.state,
        "zip": req.body.zip,
        "email": req.body.email
    }
    console.log('Cleaned user')
    console.log(newUser)
//once we have a clean user information, we add the to the eList
eList.users.push(newUser)
//we need to turn the eList values back into text in order to write 
var json = JSON.stringify(eList)
fs.writeFileSync('./data/emails.json', json, 'utf8', ()=>{
    console.log("finished writing file")
})

console.log('current eList')
console.log(eList)

//res.render('thankyou')
res.redirect(303, "/newsletter/thankyou")
}

exports.newsletterSignupList = (req,res)=>{
    console.log(eList)
    res.render('userspage',{"users":eList.users})
}
exports.newsletterUser = (req,res)=>{
    var userDetails = eList.users.filter((user)=>{
        return user.email == req.params.email
    })
    res.render('userdetails',{"users":userDetails})
}

exports.newsletterDelete = (req,res)=>{
    var newUsers = {"users":[]}

   

    newUsers.users = eList.users.filter((user)=>{
        return user.email != req.params.email
    })
    var json = JSON.stringify(newUsers)
    fs.writeFileSync('./data/emails.json', json, 'utf8', ()=>{
        console.log("finished writing file")
    })
    
    res.send('<a href="/newsletter/list">Go back</a>')
}
