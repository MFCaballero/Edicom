const {Apartment, User} = require('../../db.js');
const bcrypt = require('bcryptjs');

module.exports = async (req, res, next) => {
	let user = req.body;
	let {apartment} = req.body;
	try {
		const hashedPassword = await bcrypt.hash(user.password, 12);
		user = await User.create({...user, password: hashedPassword});
		user.setApartment(apartment);
		return res.json(user).status(200);
	} catch (err) {
		console.log('el error en el controllerrrrr', err);
		// return res.status(400).json(new Error(err));
		res.status(403).json(new Error("Email ya existe en la BBDD"))
	}
};

// res.status(500).json(new Error("Error creating the alert"))