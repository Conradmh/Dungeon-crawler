require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const PORT = 3000; // process.env.PORT ||  3000

const app = express();

 // middleware
app.use(bodyParser.json());

  // DB
// const  db = require('./config/keys').mongoURI;

const  db = 'mongodb://localhost/crawler';


 // connect to mongodb

mongoose
  .connect(db, {
     useNewUrlParser: true,
     useCreateIndex: true,
     useFindAndModify: false,
     useUnifiedTopology: true
})
  .then(() => console.log('MongoDB Connected'))
  .catch((err) => console.log(err));


app.listen(PORT, () => console.log(`Server started on port: ${PORT}`));
