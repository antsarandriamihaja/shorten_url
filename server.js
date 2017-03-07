var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var path = require('path');

//connect to Mongoose
mongoose.connect('mongodb://arandriamihaja-short-url-4528063:27017/url_shortener', function (err, db){
     if (err) console.log(err);
    else(console.log('mongoose connection success'));
 });
//create database
var db = mongoose.connection;


//configure app
app.use(express.static(path.join(__dirname, '/public')));

//define routes


//handling request for homepage '/' which is index.html in the views folder

app.get('/', function(req, res){
    res.sendFile(path.join(__dirname,'./views/index.html'));
});

app.listen(8080, function(){
    console.log('Server listening on port 8080');
});