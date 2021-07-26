const {Amenity} = require('../../db.js');

module.exports = async (req, res, next) => {
	var name = req.params.name;
	var amenity = await Amenity.findOne({
		where: {
			name: name, //ver si van estos nombres
		},
	});
	if (amenity) {
		res.status(200);
		return res.json(amenity);
	} else {
		return res.json({error: 'The amenity does not exist'}).status(404);
	}
};
