const mongoose = require('mongoose');

const coworkingSpaceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  image: { type: String, trim: true, required: false },
  location: { lat: Number, lng: Number },
  description: { type: String },
  capacity: { type: Number, required: true },
  available_spots: { type: Number, required: true },
});

module.exports = mongoose.model('CoworkingSpace', coworkingSpaceSchema);
