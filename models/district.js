var mongoose = require('mongoose');
var DistrictSchema = new mongoose.Schema({
  name:                { type: String },
  created_at:          { type: Date, default: Date.now }
});

var District = mongoose.model('District', DistrictSchema);

module.exports = District;

// var district1 = new District({
//   name: "Sheung Wan",
//   created_at: new Date()
// });

// district1.save(function(err) {
//   if (err) console.log(err);
//   console.log('District created!');
// });
