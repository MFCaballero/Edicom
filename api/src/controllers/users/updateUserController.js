const {Apartment, User} = require('../../db.js');
const bcrypt = require('bcryptjs');

module.exports = async (req, res, next) => {
	let user = req.body;
	let {id} = req.body;
	try {
		user = await User.update(
			{
				...user,
			},
			{where: {id}}
		);
		return res.json(user).status(200);
	} catch (err) {
		res.json(err);
		return console.log(err);
	}
};
