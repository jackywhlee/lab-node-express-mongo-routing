var express        = require('express');
var path           = require('path');
var debug          = require("debug");
var logger         = require('morgan');
var mongoose       = require('mongoose');
var bodyParser     = require('body-parser');
var expressLayouts = require('express-ejs-layouts');
var connect        = require('connect')
var methodOverride = require('method-override')


var app    = express();
var router = express.Router();
var port   = process.env.PORT || 3000;

var moongoose = require('mongoose');
moongoose.connect('mongodb://localhost/sushi-me-away');
var Restaurant = require("./models/restaurant");
var District = require("./models/district");

app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(methodOverride('_method'));
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

//index
router.get('/', function(req, res) {
  Restaurant.find({}, function (err, restaurants) {
    if (err){
      res.send(err);
    }
    res.json(restaurants);
  });
});

//show
// router.get('/:id', function(req, res) {
//   Restaurant.find({}, function (err, restaurants) {
//     if (err) {
//       res.send(err);
//     }
//   res.json(restaurants)
//   });
// });

//post
router.post('/', function(req, res) {
  Restaurant.create(req.body.restaurant, function (err, restaurant){
    if (err) {
      res.send("this didn't work" + err);
    }
    res.json({message: "Restaurant created!"});
  });
});

//update
// router.('/:id', function(req, res) {
//   Restaurant.delete(req.body.restaurant, function (err, restaurant){
//     if (err) {
//       res.send("this didn't work" + err);
//     }
//     res.json({message: "Restaurant created!"});
//   });
// });

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
app.listen(3000);
console.log('Server has Awaken...');
