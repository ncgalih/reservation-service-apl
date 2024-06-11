const Reservation = require('./model');
const axios = require('axios');

const createReservation = async (req, res) => {
  try {
    const { userId, date, serviceType } = req.body;

    const reservation = new Reservation({ userId, date, serviceType });
    await reservation.save();
    res.status(201).json(reservation);
    console.log('Reservasi berhasil dibuat:', reservation);
  } catch (error) {
    res.status(500).json({ message: 'Kesalahan server' });
    console.error('Gagal membuat reservasi:', error.message);
  }
};

const getAllReservations = async (req, res) => {
  try {
    const reservations = await Reservation.find();
    res.status(200).json(reservations);
    console.log('Semua reservasi berhasil diambil:', reservations);
  } catch (error) {
    res.status(500).json({ message: 'Kesalahan server' });
    console.error('Gagal mengambil semua reservasi:', error.message);
  }
};

const getReservationById = async (req, res) => {
  try {
    const reservation = await Reservation.findById(req.params.id);
    if (!reservation) {
      return res.status(404).json({ message: 'Reservasi tidak ditemukan' });
    }
    res.status(200).json(reservation);
    console.log('Reservasi:', reservation);
  } catch (error) {
    res.status(500).json({ message: 'Kesalahan server' });
    console.error('Gagal mengambil reservasi:', error.message);
  }
};

const getReservationsByUser = async (req, res) => {
  try {
    const reservations = await Reservation.find({ userId: req.params.userId });
    res.status(200).json(reservations);
    console.log('Reservasi pengguna berhasil diambil:', reservations);
  } catch (error) {
    res.status(500).json({ message: 'Kesalahan server' });
    console.error('Gagal mengambil reservasi pengguna:', error.message);
  }
};

const cancelReservation = async (req, res) => {
  try {
    const reservation = await Reservation.findByIdAndUpdate(req.params.id, { status: 'cancelled' }, { new: true });
    if (!reservation) {
      return res.status(404).json({ message: 'Reservasi tidak ditemukan' });
    }
    res.status(200).json(reservation);
    console.log('Reservasi berhasil dibatalkan:', reservation);
  } catch (error) {
    res.status(500).json({ message: 'Kesalahan server' });
    console.error('Gagal membatalkan reservasi:', error.message);
  }
};

const completeReservation = async (req, res) => {
  try {
    const reservation = await Reservation.findByIdAndUpdate(req.params.id, { status: 'completed' }, { new: true });
    if (!reservation) {
      return res.status(404).json({ message: 'Reservasi tidak ditemukan' });
    }
    res.status(200).json(reservation);
    console.log('Reservasi berhasil diselesaikan:', reservation);
  } catch (error) {
    res.status(500).json({ message: 'Kesalahan server' });
    console.error('Gagal menyelesaikan reservasi:', error.message);
  }
};

const getRemainingReservations = async (req, res) => {
  try {
    const remainingReservations = await Reservation.find({ status: 'pending' });
    res.status(200).json(remainingReservations);
    console.log('Reservasi tersisa berhasil diambil:', remainingReservations);
  } catch (error) {
    res.status(500).json({ message: 'Kesalahan server' });
    console.error(error.message);
  }
};

module.exports = {
  createReservation,
  getAllReservations,
  getReservationById,
  getReservationsByUser,
  cancelReservation,
  completeReservation,
  getRemainingReservations
};
