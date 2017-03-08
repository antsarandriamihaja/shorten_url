var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var path = require('path');
var Url = require('./models/url');
var shorterUrl = require('./shorterUrl.js');
var webhost = 'http://arandriamihaja-short-url-4528063';

//connect to Mongoose
mongoose.connect('mongodb://arandriamihaja-short-url-4528063:27017/url_shortener');

//configure app and to be able to take the long url from user from the AJAX call
app.use(express.static(path.join(__dirname, '/public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


//handling request for homepage '/' which is index.html in the views folder
app.get('/', function(req, res){
    res.sendFile(path.join(__dirname,'./views/index.html'));
});

//handling POST requests
app.post('/api/shorten', function(req, res){
    var original_url = req.body.url;
   var generatedUrl = '';
   //add the original url into the Url database and save the link
   var newUrl = Url({
       longUrl: original_url
   });
   
   newUrl.save(function(err){
       if (err) console.log(err);
  
    generatedUrl = webhost+ shorterUrl.encode(newUrl._id); 
    
    res.send({'generatedUrl': generatedUrl});
    });
   
   
});


app.get('/:encoded_id', function(req, res){
    var shorter_id = req.params.encoded_id;
    var id = shorterUrl.decode(shorter_id);
    Url.findOne({_id: id}, function (doc){
        if (doc)
        res.redirect(doc.longUrl);
        else{
          res.redirect(webhost);  
        }
        
    });
    
});


app.listen(8080, function(){
    console.log('Server listening on port 8080');
});