const {Amenity, Buildings} = require('../../db');
//all amenities who belongs to building
module.exports = async (req, res, next) => {
	console.log('master of the gatos');
	const {id} = req.params;
	try {
		const building = await Buildings.findOne({where: {id}});
		let amenities = await Amenity.findAll({
			where: {
				buildingId: building.id,
			},
		});
		return res.json(amenities);
	} catch (err) {
		res.json(err);
		return console.log(err);
	}
};
