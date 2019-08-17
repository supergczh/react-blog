
const express=require('express');
const mongodb=require('mongodb');
const mongoose=require('mongoose');
const bodyParser=require('body-parser');
const cors = require('cors');

const app = express();

app.use(cors());

app.use(bodyParser.json());


const dbUrl = "mongodb://127.0.0.1:27017";

mongodb.MongoClient.connect(dbUrl,{useMongoClient:true}, (err, client) => {

  if (err) throw err;

  const db = client.db('blog');

  // app.get('/api/useradmin', (req, res) => {
  //   // db.collection('useradmin').find({}).toArray((err, user) => {
  //     res.json( {user:"test"});
  //   // });

  // });

  app.use('/api', require('./routes/user'));

app.listen(5000, () => console.log('Server is running on localhost:8080'));
});

