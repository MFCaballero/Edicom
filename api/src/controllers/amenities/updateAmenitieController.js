const {Amenity} = require('../../db.js');

module.exports = async (req, res, next) => {
	const {id} = req.params;
	const {amenity_type, quantity, amenity_detail, capacity} = req.body;
	console.log(amenity_type, quantity, amenity_detail, "DATOS")
	try {
		const amenity = await Amenity.findOne({where: {id}});
		amenity.amenity_type = amenity_type;
		amenity.quantity = quantity;
		amenity.amenity_detail = amenity_detail;
		amenity.capacity = capacity;

		amenity.save();
		res.send(amenity);
	} catch (error) {
		next(error);
	}
};
