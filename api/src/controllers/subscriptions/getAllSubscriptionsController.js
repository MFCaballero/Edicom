const {Subscription, User} = require('../../db');

module.exports = async (req, res, next) => {
	try {
		const subscriptions = await Subscription.findAll({
			include: [{
                model: User,
            }],
		});
		return res.json(subscriptions);
	} catch (error) {
		next(error);
		return res.json(error);
	}
};