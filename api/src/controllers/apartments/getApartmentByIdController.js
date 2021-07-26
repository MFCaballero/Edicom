const {Apartment} = require('../../db.js');

module.exports = async (req, res, next) => {
	try {
		var id = req.params.id;
		var apartment = await Apartment.findOne({
			where: {
				id, //ver si van estos nombres
			},
		});
		res.json(apartment);

		// if (apartment) {
		// 	res.status(200);
		// 	return res.json(apartment);
		// } else {
		// 	return res.json({error: 'The apartment does not exist'}).status(404);
		// }
	} catch (err) {
		next(err);
	}
};
