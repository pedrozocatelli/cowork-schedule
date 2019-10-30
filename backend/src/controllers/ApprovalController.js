const Booking = require('../models/Booking');

module.exports = {
  async store(req, res) {
    console.log('começo');
    const { booking_id } = req.params;
    const booking = await Booking.findById(booking_id).populate('spot');
    console.log('entrei dps;');
    booking.approved = true;

    await booking.save();

    const bookingUserSocket = req.connectedUsers[booking.user];

    if (bookingUserSocket) {
      req.io.to(bookingUserSocket).emit('booking_response', booking);
    }

    res.json(booking);
  }
};
