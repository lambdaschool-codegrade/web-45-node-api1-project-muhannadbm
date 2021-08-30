// BUILD YOUR SERVER HERE
const express = require('express')

const User = require('./users/model')

const server = express()

server.use(express.json())

//Create a user
server.post('/api/users', (req,res) => {
    let user = req.body
    User.insert(user)
    .then(user => {
        if(!user.name || !user.bio){
            res.status(400).json({message: 'provide name and bio'})
        }
        res.status(201).json(user)
    })
    .catch(e => console.log(e))
})

//Get all users
server.get('/api/users',async(req,res) =>{
    let users = await User.find()
    res.status(200).json(users)
})

server.get('/api/users/:id', async(req,res)=>{
    let userid = req.params.id
    try{
    let myuser = await User.findById(userid)
    if(!myuser) {
        res.status(404).json({message: 'does not exist'})
    }
    res.status(200).json(myuser)
}
catch(e){
console.log(e)
}
})


server.delete('/api/users/:id',(req,res)=>{
    let myuserid = req.params.id
    User.remove(myuserid)
    .then(user=> {
        if(user){
        res.status(200).json(user) }
        else{
        res.status(404).json({message: 'does not exist'}) }
    })
})


// server.put('/api/users/:id', (req,res)=> {
//     // console.log(req.params.id)
//     // console.log(req.body)
//      User.update(req.params.id, req.body).
//     then(user=> {
//         if(!user.name || !user.bio){
//          res.status(400).json({message: 'provide name and bio'})
//         }
//         if(user) {
//         res.status(200).json(user)}
//         else{
//             res.status(404).json({message: 'does not exist'})
//         }
//     })
//     .catch(e=> {
//         res.status(500).json({message: e.message})
//     })
// })

server.put('/api/users/:id', (req,res)=> {
User.update(req.params.id, req.body)
.then(user => {
    if(user===null){
        res.status(404).json({message: 'does not exist'})
    }
    if(user){
        if(!user.name || !user.bio) {
            res.status(400).json({message: 'provide name and bio'})
        }
        res.status(200).json(user)
    }
})
.catch(e=> res.status(404))
    
    })

module.exports = server; // EXPORT YOUR SERVER instead of {}
