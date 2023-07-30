var express = require('express');
var app     = express();
var cors    = require('cors');
var dal     = require('./dal.js');
const e = require('express');
//const admin = require('./admin.js');
// const create = require("./")

// used to serve static files from public directory
app.use(express.static('public'));
app.use(cors());

const { MongoClient } = require('mongodb');
// var db            = null;
let db;
 
// const admin = require('firebase-admin');

// Initialize the Firebase Admin SDK
// admin.initializeApp({
//   credential: admin.credential.applicationDefault(),
//   // Your Firebase project configuration goes here
// });

// // Middleware function to verify the token
async function verifyToken(req, res, next) {
  const token = req.headers.authorization;

  if (token) {
    admin.auth().verifyToken(token)
        .then(decodedToken => {
            console.log("Decoded Token: ", decodedToken)
            return next();
        }).catch(err => {
            return res.status(401).send("Unauthorized");
        
        })
        }
      // Verify the token using the Firebase Admin SDK
      //const decodedToken = await admin.auth().verifyIdToken(token);
      // The decodedToken object contains information about the authenticated user
      // You can access the user's UID using `decodedToken.uid`

      // Further code to handle authenticated requests
      // ...

      // If the token is valid, you can call 'next()' to continue to the next middleware or route handler
   
    
      // If the token is invalid or verification fails, send an error response to the client
      else{
        return res.status(401).send({ error: 'Unauthorized' });
    }
  } 
  



// connect to mongo
    //const uri = 'mongodb://localhost:27017';
    const uri = 'mongodb+srv://grmulat:BfO4Puym4S7V1yYr@cluster0.haeacpd.mongodb.net/?retryWrites=true&w=majority'
    const client = new MongoClient(uri, { useUnifiedTopology: true });
app.use("/",(req,res,next)=>{
    if(!db){
        try {
             client.connect();
            console.log('Connected successfully to server');
        
            db = client.db('myProject');
            // console.log("reddddddddd",db)
            req.db = db;
            next()
            // const collection = db.collection('users');
        
            // Call the testing functions or perform any other necessary operations
        
          } catch (error) {
            console.error('Error connecting to the MongoDB server:', error);
          }
    }else{

        req.db= db;
        next();
    }

})
app.use("/",dal)
    


// create user account



// login user 


// find user account
app.get('/account/find/:email', function verifyToken (req, res) {

    dal.find(req.params.email).
        then((user) => {
            console.log(user);
            res.send(user);
    });
});




// app.listen(process.env.port);


// var port = 5000;
// app.listen(process.env.port || 5000);
// console.log('Running on port: ' + port);

var port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Running on port: ${port}`);
});