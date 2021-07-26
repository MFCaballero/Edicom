const { Services, Buildings, Ratings } = require("../../db.js");

module.exports = async (req, res, next) => {
	const id = req.params.id
	try {
		const buildingService = await Buildings.findOne({where: {id}})
		let data = await Services.findAll({
			where: {
				buildingId: buildingService.id
			},
			include: [{
                model: Ratings,
            }],
			/* order: [['date', 'DESC']] */
		});
		return res.json(data);
	} catch (err) {
        next(err);
		res.json(err);
		return console.log(err);
	}
};