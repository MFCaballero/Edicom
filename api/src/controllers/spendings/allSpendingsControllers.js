const { Spendings } = require('../../db');


// Path of this controller --> get(http://localhost:3001/spendings/all?buildingId)
module.exports = async (req, res, next) => {

	const { buildingId } = req.query;

	try{
		if(buildingId)
		{
 			var data = await Spendings.findAll(
				{
					where: {
						buildingId: buildingId
					}
				}
			);
		}
		else {
			var data = await Spendings.findAll();
		}
		return res.json(data)
	}
	catch (err) {
		res.json(err)
		return console.log(err)
	}

}