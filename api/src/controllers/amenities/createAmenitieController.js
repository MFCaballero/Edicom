const {Amenity, Buildings} = require('../../db.js');

module.exports = async (req, res, next) => {
	let amenity = req.body;
	let {building} = req.body;
	try {
		amenity = await Amenity.create(amenity);
		console.log("2. se creo el amenity")
		amenity = await amenity.setBuilding(building);
		console.log("3. se asigno el edificio al amenity")
		return res.json(amenity).status(200);
	} catch (err) {
		res.json(err);
		return console.log(err);
	}
};
