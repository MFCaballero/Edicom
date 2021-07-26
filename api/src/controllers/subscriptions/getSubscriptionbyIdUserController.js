const {Subscription, User} = require('../../db');

module.exports = async (req, res, next) => {
    const { id } = req.params
	try {
		const subscription = await Subscription.findOne({where: {userId : id}});
		return res.json(subscription);
	} catch (error) {
		next(error);
		return res.json(error);
	}
};