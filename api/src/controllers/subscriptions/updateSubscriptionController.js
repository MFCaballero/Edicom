const {Subscription} = require('../../db.js');

module.exports = async (req, res, next) => {
	const { alerts, id } = req.body;
	try {
		let subscription = await Subscription.update({alerts: alerts},
        { where: { id: id } });

		return res.json({succes: `Subscription updated successfully`}).status(200);
	} catch (err) {
		next(err);
		res.json(err);
	}
};