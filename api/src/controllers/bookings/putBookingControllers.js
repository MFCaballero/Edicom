const { Booking } = require('../../db');


module.exports = async (req, res, next) => {

	const {id} = req.params;
    const { start, finish, status } = req.body
	
    try 
    {
		const booking = await Booking.update(
			{
                start,
                finish,
                status
			},
			{
				where: {
					id,
				},
			}
		);
		return res.json(booking).status(200);

	} catch (err) {
		/*  console.error(err); */
		res.json(err);
	}
};