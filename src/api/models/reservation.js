const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  price: { type: Number, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  coworkingSpace: { type: mongoose.Schema.Types.ObjectId, ref: 'CoworkingSpace', required: true },
});

module.exports = mongoose.model('Reservation', reservationSchema);
