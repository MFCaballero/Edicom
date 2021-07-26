const {Apartment} = require('../../db.js');

module.exports = async (req, res, next) => {
	const {id} = req.params;
	const {cata_apartment, mt2, number_apartment, state} = req.body;
	//console.log(cata_apartment)

	try {
		await Apartment.update(
			{
				cata_apartment: cata_apartment,
				mt2: mt2,
				number_apartment: number_apartment,
				state: state,
			},
			{where: {id}}
		);
		const apartment = await Apartment.findOne({where: {id}});
		res.send(apartment);
	} 
	catch (error) {
		
		res.status(403).json(new Error(error.message))
	}

};
