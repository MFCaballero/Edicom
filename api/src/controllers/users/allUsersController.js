const {User, Apartment, Buildings} = require('../../db');
//getUserByApartment
//router.get('/all/:id', allUsers);
module.exports = async (req, res, next) => {
	const {id} = req.params;
	try {
		const user = await User.findAll({where: {apartmentId: id}});
		return res.json(user);
	} catch (err) {
		res.json(err);
		return console.log(err);
	}
};
