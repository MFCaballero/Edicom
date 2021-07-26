const {Booking} = require('../../db.js');

module.exports = async (req, res, next) => {
	try {
		bookings = await Booking.findAll();
		return res.json(bookings).status(200);
	} catch (err) {
		res.json(err);
		return console.log(err);
	}
};
