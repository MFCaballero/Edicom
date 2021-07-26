const {User, Apartment, Buildings} = require('../../db');
//router.get('/allByBuilding',allByBuilding);
module.exports = async (req, res, next) => {
	const {id} = req.params;
	try {
		const users = await User.findAll({
			include: [{model: Apartment, where: {buildingId: id}}],
		});
		return res.json(users);
	} catch (error) {
		next(error);
		return res.json(error);
	}
};
