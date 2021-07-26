const {Apartment, Buildings} = require('../../db.js');

module.exports = async (req, res, next) => {
	
	let apartment = req.body;
	let {building} = req.body;

	try {
		apartment = await Apartment.create(apartment);
		await apartment.setBuilding(building);
		console.log("Antes de retornar un 200")
		return res.json(apartment).status(200);
	} 
	catch (err) {
		// res.json(err);
		console.log("Antes de retornar un 403")
		res.status(403).json(new Error("El número de dpto ya está creado"))
	}
};
