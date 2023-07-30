// const MongoClient = require('mongoreq.req.db').MongoClient;
// const url         = 'mongoreq.req.db://localhost:27017';
//const url = 'mongodb+srv://grmulat:GirumsDBiscool@cluster0.haeacpd.mongodb.net/?retryWrites=true&w=majority'
// const { MongoClient } = require('mongoreq.req.db');
// var req.req.db            = null;
var express = require('express');
const { redirect } = require('statuses');
 var router  = express.Router();
 const {ObjectID} = require("bson")


 router.get('/account/create/:name/:email/:password', function (req, res) {

    // check if account exists
    req.db.collection("users").find().toArray().
        then((users) => {
            const valueExist = users.some(doc => doc.email === req.params.email)
            
            if(valueExist == true){
                // console.log('User already in exists');
                res.json({status: "success", data: 'User already exists'});    
            }
            else{
                // else create user
                const collection = req.db.collection('users');
                const doc = {name: req.params.name,email: req.params.email,password: req.params.password};
                collection.insertOne(doc).then(data => {
                    res.json({status: "Sucess", data : "created"})
                })
                //     , {w:1}, function(err, result) {
                //     err ? reject(err) : resolve(doc);
                // }); 

                // dal.create(req.params.name,req.params.email,req.params.password).
                //     then((user) => {
                //         console.log("list of users",user);
                //         res.json({status: "success", data: user});  
                //         // res.send(user);            
                //     });            
            }

        }).catch(e=>{
            console.log("testing user errr ====> ", e)

        });
});


router.get('/account/login/:email/:password', function (req, res) {
    req.db.collection("users").find().toArray().
        then((users) => {
            const valueExist = users.some(doc => doc.email === req.params.email)
            const foundUser = users.find(user => user.email === req.params.email);
            
            const foundUserPassword = users.some(doc => doc.password === req.params.password)
            // if user exists, check password
            if(valueExist == true && foundUserPassword == true){
                
                res.json({status: "success", data: foundUser});    
            }
            else{
                res.json({status: "success", data: "Invalid email or password"}); 
            }
    });
    
});

// update - deposit/withdraw amount
router.get('/account/update/:email/:amount', function (req, res) {
    console.log("amout ===> deposit", req.params);
  
    var amount = Number(req.params.amount);
    req.db.collection("users").updateOne(
      { email: req.params.email },
      { $inc: { balance: amount } }
    )
    .then((response) => {
      console.log(response);
    //   res.send(response);
      res.json({status: "success", data: "Successfully deposited"});
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send('Internal Server Error');
    });
  });

  // update - withdraw amount
router.get('/account/updatewithdraw/:email/:amount', function (req, res) {
    console.log("amout ===> withdraw", req.params);
  
    var amount = Number(req.params.amount);
    req.db.collection("users").updateOne(
      { email: req.params.email },
      { $inc: { balance: -amount } }
    )
    .then((response) => {
      console.log(response);
    //   res.send(response);
      res.json({status: "success", data: "Successfully deposited"});
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send('Internal Server Error');
    });
  });

  // all accounts
  router.get('/account/all', function (req, res) {
    req.db.collection("users").find().toArray().
        then((users) => {
            // const valueExist = users.some(doc => doc.email === req.params.email)

            // const foundUser = users.find(user => user.email === req.params.email);
            console.log("list of account", users)
            // if(valueExist == true){
                // console.log('User already in exists');
                res.json({status: "success", data: users});    
            // }
           

        }).catch(e=>{
            console.log("testing user errr ====> ", e)

        });
  });
  

  // find one user by email - alternative to find
  router.get('/account/findOne/:email', function (req, res) {
    req.db.collection("users").findOne({ email: req.params.email })
      .then((user) => {
        res.json({status: "success", data: user});    
      })
      .catch((error) => {
        console.error(error);
        res.status(500).send('Internal Server Error');
      });
  });
  

// update - deposit/withdraw amount
function update(email, amount){
    return new Promise((resolve, reject) => {    
        const customers = req.db
            .collection('users')            
            .findOneAndUpdate(
                {email: email},
                { $inc: { balance: amount}},
                { returnOriginal: false },
                function (err, documents) {
                    err ? reject(err) : resolve(documents);
                }
            );            


    });    
}

// all users
function all(){
    return new Promise((resolve, reject) => {    
        const customers = req.db
            .collection('users')
            .find({})
            .toArray(function(err, docs) {
                err ? reject(err) : resolve(docs);
        });    
    })
}


module.exports = router;