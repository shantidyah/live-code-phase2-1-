var express = require('express');
var router = express.Router();
const User = require('../models/users.js')
const Item = require('../models/items.js')
const {Auth} = require('../middleware/auth')
var jwt = require('jsonwebtoken');


/* GET home page. */

router.post('/register',(req, res) =>{
  User.create({
    username: req.body.username,
    password: req.body.password
  })
  .then(result => {
    res.status(201).json({success:true, message:`Account ${req.body.username} registered`})
  })
  .catch( err =>{
    res.json(err)
  })
})

router.post('/request_token', ( req, res) =>{
  User.findOne({
    username: req.body.username,
    password: req.body.password
  })
  .then( user =>{
    var token = jwt.sign({ id:user._id, username: user.username }, 'thisissecret')
    res.status(201).json({token})
  })
  .catch( err =>{
    res.json(err)
  })
})


router.post('/items',Auth,(req, res)=>{
  console.log(req.headers.token);
  
  var decoded = jwt.verify(req.headers.token, 'thisissecret')
  Item.create({
    name: req.body.name,
    price: req.body.price,
    stock: req.body.stock,
    user: decoded.id
  })
  .then( item =>{

    res.status(201).json(item)
  })
  .catch( err =>{
    res.json(err)
  })
})


router.get('/items', (req, res) =>{
  Item.find({$and: [{name: new RegExp(req.query.name, 'i')},
                    {price: {$gte:req.query.price_start}},
                    {tags: {$in : [new RegExp(req.query.tag, 'i')]}}
                  ]
  })
  .then( items =>{
    res.status(200).json(items)
  })
  .catch(err=>[
    res.json(err)
  ])
})

router.get('/items/all',(req, res)=>{
  Item.find({})
    .then( items =>{
      console.log(items);
      
    res.status(200).json(items)
  })
  .catch(err=>[
    res.json(err)
  ])
})

module.exports = router;
