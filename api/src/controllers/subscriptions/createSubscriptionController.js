const {Subscription, User} = require('../../db.js');

module.exports = async (req, res, next) => {
	let { alerts, userID } = req.body;
	console.log(req.body);
	try {
		subscription = await Subscription.create({alerts: alerts
		});
        user = await User.findOne({where: {id: userID}})
		await subscription.setUser(user);
		return res.json({succes: `Subscription created successfully`}).status(200);
	} catch (err) {
		res.json(err);
		next(err);
	}
};