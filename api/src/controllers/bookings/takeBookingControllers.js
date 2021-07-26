const {Booking} = require('../../db');

module.exports = async (req, res, next) => {
	const {bookingId, userId} = req.params;

	try {
		const booking = await Booking.update(
			{
				userId,
				status: 'booked',
			},
			{
				where: {
					id: bookingId,
				},
			}
		);

		const bookingsList = await Booking.findAll({ 
			where: {
				userId: userId
			}
		})

		return res.json(bookingsList).status(200);
	} catch (err) {
		/*  console.error(err); */
		next(err);
	}
};
