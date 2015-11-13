var mongoose = require('mongoose');

var RestaurantSchema = new mongoose.Schema({
  name:                { type: String },
  website:             { type: String },
  address:             { type: String },
  description:         { type: String },
  price_range:         { type: String },
  image_url:           { type: String },
  telephone:           { type: String },
  district:            { type: String },
  // district:            { type: mongoose.Schema.Types.ObjectId, ref: 'District'},
  created_at:          { type: Date, default: Date.now }
});

var Restaurant = mongoose.model('Restaurant', RestaurantSchema);

module.exports = Restaurant;

// var Restaurant = require("./models/restaurant");
var district1 = require("./district");

// var restaurant1 = new Restaurant({
//   name: "Genki Sushi",
//   website: "www.genkisushi.com.hk",
//   address: "Shop 241, 2/F, Shun Tak Centre, 168-200 Connaught Road Central, Sheung Wan",
//   description: "wahhh wahhh wahhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh",
//   price_range: "$101-$200",
//   image_url: "http://i.imgur.com/WA7UWAA.jpg",
//   telephone: "2540 8929",
//   district: district1._id,
//   created_at: new Date()
// });

// restaurant1.save(function(err) {
//   if (err) console.log(err);
//   console.log('Restaurant created!');
// });

