const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
  date: { type: Date, required: true },
  serviceType: { type: String, required: true },
  status: { type: String, enum: ['pending', 'completed', 'cancelled'], default: 'pending' },
});

const Reservation = mongoose.model('Reservation', reservationSchema);

module.exports = Reservation;
