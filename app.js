var express        = require('express');
var path           = require('path');
var debug          = require("debug");
var logger         = require('morgan');
var mongoose       = require('mongoose');
var bodyParser     = require('body-parser');
var expressLayouts = require('express-ejs-layouts');


var app    = express();
var router = express.Router();
var port           = process.env.PORT || 3000;

var moongoose = require('mongoose');
moongoose.connect('mongodb://localhost/sushi-me-away');
var Restaurant = require("./models/restaurant");
var District = require("./models/district");

app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(__dirname + '/public'));

app.set('views', path.join(__dirname, 'views'));
app.use(expressLayouts);
app.engine('ejs', require('ejs').renderFile);
app.set('view engine', 'ejs');

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

// ############ YOU CAN ADD YOUR CODE BELOW ########
// ###### HAPPY CODING  :) #########################

router.get('/', function(req, res) {
  Restaurant.find({}, function (err, restaurants) {
    if (err){
      res.send(err);
    }
  res.json(restaurants);
  });
});

router.post('/', function(req, res) {
  var restaurant = new Restaurant();
  restaurant.name = req.body.name;
  restaurant.website = req.body.website;
  restaurant.address = req.body.address;
  restaurant.description = req.body.description;
  restaurant.price_range = req.body.price_range;
  restaurant.image_url = req.body.image_url;
  restaurant.telephone = req.body.telephone;
  restaurant.district = req.body.district;

  restaurant.save(function(err) {
    if (err)
      res.send(err);
    res.json({message: "Restaurant created!"});
  })
});

// router.get('/api/index', function(req, res) {
//   // SHOW
// });

app.use(require('./controllers/restaurants'));
app.use('/', router);
app.listen(3000);
console.log('Server has Awaken...');
