var express    = require('express'),
    router     = express.Router(),
      // http://expressjs.com/4x/api.html#router don't delete me!
    bodyParser = require('body-parser'),
      // https://www.npmjs.com/package/body-parser don't delete me!
    methodOverride = require('method-override');
      // https://www.npmjs.com/package/method-override don't delete me!

var Restaurant = require("../models/restaurant");

//homepage
router.get('/', function(req, res){
      res.render('about.html');
    });

router.get("/restaurants", function(req, res){
    Restaurant.find({}, function (err, restaurants) {
      res.render('restaurants/index', { restaurants: restaurants });
    });
  });

router.post("/restaurants", function(req, res){
  console.log('restaurant CREATE');
  Restaurant.create(req.body.restaurant, function (err, restaurant) {
    if (err){
      res.send("something wrong happened"+ err)
    } else {
      res.redirect('/restaurants');
    }
  });
})

// router.put("/restaurants/:id"), function(req, res){
//   Restaurant.findByIdAndUpdate(req.params.id), function (err, restaurant){
//     if (err){
//       res.send("we f'ed up m8" +err)
//     } else {
//       res.redirect('/restaurants');
//     }
//   }
// }

router.delete('/restaurants/:id', function (req, res) {
  console.log('hit the delete method');
  Restaurant.findById(req.params.id, function(err, restaurant){
    if (err) res.send(err)

    restaurant.remove(function(err){
      if (err) res.send(err)

      res.redirect('/restaurants');
    })
  })
});

module.exports = router;
