require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const PORT = 5000; // process.env.PORT ||  5000

const app = express();

const users = require('./controllers/api/users')
const characters = require('./controllers/api/characters')
const squares = require('./controllers/api/squares')
const monsters = require('./controllers/api/monsters')
const dungeons = require('./controllers/api/dungeons')
const games = require('./controllers/api/games')

 // middleware

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use(cors(
  {
    origin:'http://localhost:3000',
    credentials: true
  }
));
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


app.use('/api/users', users)
app.use('/api/characters', characters)
app.use('/api/squares', squares)
app.use('/api/monsters', monsters)
app.use('/api/dungeons', dungeons)
app.use('/api/games', games)

app.listen(PORT, () => console.log(`Server started on port: ${PORT}`));
