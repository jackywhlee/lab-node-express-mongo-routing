var express        = require('express');
var path           = require('path');
var debug          = require("debug");
var logger         = require('morgan');
var mongoose       = require('mongoose');
var bodyParser     = require('body-parser');
var expressLayouts = require('express-ejs-layouts');
var connect        = require('connect');
var methodOverride = require('method-override');
var moongoose      = require('mongoose');
var Restaurant     = require("./models/restaurant");
var District       = require("./models/district");

var app            = express();
var router         = express.Router();
var port           = process.env.PORT || 3000;

var mongoUri       =  process.env.MONGOLAB_URI || 'mongodb://localhost/sushi-me-away';
moongoose.connect(mongoUri);


app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(methodOverride('_method'));
app.use(express.static(__dirname + '/public'));
app.use(expressLayouts);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.engine('ejs', require('ejs').renderFile);
app.engine('.html', require('ejs').renderFile);

if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

//index
router.get('/', function(req, res) {
  Restaurant.find({}, function (err, restaurants) {
    if (err){
      res.send(err);
    }
    res.json(restaurants);
  });
});

//post
router.post('/', function(req, res) {
  Restaurant.create(req.body.restaurant, function (err, restaurant){
    if (err) {
      res.send("this didn't work" + err);
    }
    res.json({message: "Restaurant created!"});
  });
});

//delete
router.delete('/:id', function(req, res) {
  console.log("params = ", req.params); // { id: '56455bf497e0578f360df992' }
  console.log("id = ", req.params.id);
  Restaurant.remove({
    _id: req.params.id
  }, function (err, restaurant) {
      if (err) {
        res.send(err);
      }
      res.json({ message: 'BOOM DELETED' });
  });
});

app.use(require('./controllers/restaurants'));
app.use('/api/restaurants', router); //namespace
app.listen(process.env.PORT || 3000 );
console.log('Server has Awaken...');

