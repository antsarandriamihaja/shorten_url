var mongoose = require('mongoose');
var Schema = mongoose.Schema;
//schema for incrementing numbers of url in db
var url_countSchema = Schema({
    _id: {
        type: String, 
        required: true
    },
    seq: {type: Number,
        default: 0
    }
});

//creating a model from this schema:

var counter = mongoose.model('counter', url_countSchema);

var long_urlsSchema = new Schema({
    _id: {
        type: Number,
        index: true
    },
    longUrl: {
        type: String,
    },
    created : Date
});

//only save long urls after counter collection and providing it with an _id
long_urlsSchema.pre('save', function(next){
     var doc = this;
  // find the count and increment it by 1
  counter.findByIdAndUpdate({_id: 'count'}, {$inc: {seq: 1} }, function(err, counter) {
      if (err)
          return next(err);
      // set the _id of the urls collection to the incremented value of the counter
      doc._id = counter.seq;
      doc.created_at = new Date();
      next();
  });
});

var Url = mongoose.model('storeUrl', long_urlsSchema) ;
module.exports = Url;
