var express    = require('express'),
    router     = express.Router(),
      // http://expressjs.com/4x/api.html#router
    bodyParser = require('body-parser'),
      // https://www.npmjs.com/package/body-parser
    methodOverride = require('method-override');
      // https://www.npmjs.com/package/method-override

var Restaurant = require("../models/restaurant");

router.get("/restaurants", function(req, res){
    Restaurant.find({}, function (err, restaurants) {
      res.render('restaurants/index', { restaurants: restaurants });
    });
  })

router.post("/restaurants", function(req, res){
  Restaurant.create(req.body.restaurant, function (err, restaurant) {
    if (err){
      res.send("something wrong happened"+ err)
    } else {
      res.redirect('/restaurants');
    }
  });
})

router.put("/restaurants/:id"), function(req, res){
  Restaurant.findByIdAndUpdate(req.params.id), function (err, restaurant){
    if (err){
      res.send("we f'ed up m8" +err)
    } else {
      res.redirect('restaurants');
    }
  }
}



module.exports = router;
