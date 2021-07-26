const {User, Buildings, Apartment} = require('../../db');

module.exports = async (req, res, next) => {
	try {
		const {id} = req.params;
		const user = await User.findOne({
		where: {id},
		include: [{
			model: Apartment,
			attributes: ['buildingId', 'number_apartment']
		}]
	});
		/* const apartment = await Apartment.findOne({where: {id: user.apartmentId}}); */

		return res.json(user);
	} catch (err) {
		// res.json(err);
		// return 
		console.log(err);
	}
};
