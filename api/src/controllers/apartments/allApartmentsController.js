const {Apartment, Buildings} = require('../../db');

module.exports = async (req, res, next) => {
	const {id} = req.params;
	try {
		const apartment = await Buildings.findOne({where: {id}});
		let data = await Apartment.findAll({
			where: {
				buildingId: apartment.id,
			},
		});
		return res.json(data);
	} catch (err) {
		res.json(err);
		return console.log(err);
	}
};
