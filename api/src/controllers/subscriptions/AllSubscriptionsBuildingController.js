const {Subscription, User, Apartment} = require('../../db');

module.exports = async (req, res, next) => {
    const {id} = req.params;
	try {
		const subscriptions = await Subscription.findAll({
			include: [{
                model: User,
                include: [{model: Apartment, where: {buildingId: id}}],
            }],
		});
		return res.json(subscriptions);
	} catch (error) {
		next(error);
		return res.json(error);
	}
};