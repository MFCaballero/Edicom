const {Spendings} = require('../../db.js');

// Path of this controller --> Put(http://localhost:3001/spendings/add)
module.exports = async (req, res, next) => {
	let [id, {concept, details, supplier, amount, building, date}] = req.body;

	// console.log(req.user);

    if(req.user.userType !== 'admin')
    {
        return res.status(403).json(new Error("Usuario no autorizado"));
    }

	try {
		const spending = await Spendings.update(
			{
				concept: concept,
				details: details,
				supplier: supplier,
				amount: amount,
				buildingId: building,
				date: date
			},
			{
				where: {
					id,
				},
			}
		);

		const spendingList = await Spendings.findAll();

		return res.json(spendingList).status(200);
	} catch (err) {
		/*  console.error(err); */
		res.json(err);
	}
};
