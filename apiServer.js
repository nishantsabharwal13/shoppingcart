var express = require('express');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var logger = require('morgan');
var app = express();
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// APIs

var mongoose = require('mongoose');

// mongoose.connect('mongodb://localhost:27017/bookshop', { useMongoClient: true });

//mongo lab
mongoose.connect('mongodb://nishant1391:kunjan1320@ds257245.mlab.com:57245/reaction', { useMongoClient: true });

var db = mongoose.connection;

db.on('error',console.error.bind(console,'mongoose-connection error'))

// -->> Set Up sessions <<--

app.use(session({
  secret: 'mySecretString',
  saveUninitialized: false,
  resave: true,
  cookie: {maxAgg:1000*60*60*24*2},
  store: new MongoStore({mongooseConnection: db, ttl: 2 * 24 * 60 * 60})
}));

// save to session

app.get('/cart', function(req,res){
  if(typeof req.session.cart != 'undefined') {
    res.json(req.session.cart);
  }
});

app.post('/cart', function(req,res){
  var cart = req.body;
  req.session.cart = cart;
  req.session.save(function(err) {
    if (err) {
      throw err;
    }
    res.json(req.session.cart);
  })
});

// -->> End sessions <<--

var Books = require('./models/books.js');

//post api

app.post('/books', function (req, res) {
  var book = req.body;

  Books.create(book, function (err, books) {
    if (err) {
      throw err;
    }
    res.json(books);
  });
});

//get api

app.get('/books', function (req, res) {
  Books.find(function (err, books) {
    if (err) {
      throw err;
    }
    res.json(books);
  });
});

//delete api

app.delete('/books/:_id', function (req, res) {
  var query = { _id: req.params._id };
  Books.remove(query, function (err, books) {
    if (err) {
      console.log("# API ERROR",err);
      
    }
    res.json(books);
  });
});

//update api

app.put('/books/:_id', function (req, res) {
  var book = req.body;
  var query = { _id: req.params._id };
  var update = {
    $set: {
      title: book.title,
      description: book.description,
      image: book.image,
      price: book.price
    }
  };
  var options = { new: 'true' };

  Books.findOneAndUpdate(query, update, options, function (err, books) {
    if (err) {
      throw err;
    }
    res.json(books);
  });
});

// -->> get books api <--

app.get('/images', function(req, res) {
  const imgFolder = __dirname + '/public/images';

  const fs = require('fs');

  fs.readdir(imgFolder, function (err, files){
    if (err) {
      throw err;
    }
    const filesArr =[];

    files.forEach(function(file){
      filesArr.push({name: file});
    })
    res.json(filesArr);
  })

})

// End APIs

app.listen(3001, err => {
  if(err){
    return console.log(err)
  }
  console.log('APi 3001')
})