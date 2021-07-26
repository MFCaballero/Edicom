const {User} = require('../../db');
//router.get('/getall/', getAll);
module.exports = async (req, res, next) => {
	try {
		const users = await User.findAll();
		return res.json(users);
	} catch (error) {
		next(error);
		return res.json(error);
	}
};
