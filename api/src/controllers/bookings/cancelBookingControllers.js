const {Booking} = require('../../db');

module.exports = async (req, res, next) => {
	const {bookingId} = req.params;

	try {

		const booking = await Booking.findOne(
			{
				where: {
					id: bookingId,
				}
			}
		)

		const user = await booking.userId

		await booking.update(
			{
				userId: null,
				status: 'free',
			},
		)

		const bookingsList = await Booking.findAll({ 
			where: {
				userId: user
			}
		})


		return res.json(bookingsList).status(200);
	} catch (err) {
		/*  console.error(err); */
		next(err);
	}
};
