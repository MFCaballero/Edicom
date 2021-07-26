const { Booking } = require('../../db');


module.exports = async (req, res, next) => {

	const {id} = req.params;
	
    try {
		const bookings = await Booking.findOne(
            {
		    	where: {
                    id: id
                },
		    }
        );
		return res.json(bookings);
	}
    catch (error) 
    {
		next(error);
		return res.json(error);
	}
};