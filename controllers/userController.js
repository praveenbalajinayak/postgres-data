
const { where } = require('sequelize');
var db = require('../models')
var User = db.user;

const axios = require('axios');



var addUser = async(req,res) =>{
    const jane = await User.create({ firstName: "Raj" ,  lastName: "Mahesh" });
    //const jane = User.build({ firstName: "Jane" ,  lastName: "hello"});
    console.log(jane instanceof User); // true
    console.log(jane.firstName); // "Jane"
    //await jane.save();
    console.log('Jane was saved to the database!');
    console.log(jane.toJSON());
    res.status(200).json(jane.toJSON());
}

var getUsers = async(req,res) => {
    const data = await User.findAll({});
    res.status(200).json({data:data});

}

var getUser = async(req,res) => {
    const data = await User.findOne({
    where :{
        id:req.params.id

    }
});
    res.status(200).json({data:data});

}

var postUsers = async(req,res) => {
    let postData = req.body;
    const data = await User.create(postData);
    res.status(200).json({data:data});

}


var deleteUsers = async(req,res) => {
    const data = await User.destroy({
    where :{
        id:req.params.id

    }
});
    res.status(200).json({data:data});

}


var gettest = async(req,res) => {

let payload = JSON.stringify({
  "firstName": "ki",
  "lastName": "hjkk"
});

let config = {
  method: 'get',
  maxBodyLength: Infinity,
  url: 'http://localhost:9098/users',
  headers: { 
    'Content-Type': 'application/json'
  },
  data : payload
};

axios.request(config)
.then((response) => {
  console.log( "response from service: 9098", JSON.stringify(response.data));
  res.status(200).json({data:response.data})

})
.catch((error) => {
  console.log('error ',error);
});

}

module.exports={
    addUser, getUsers , getUser , postUsers , deleteUsers, gettest
}