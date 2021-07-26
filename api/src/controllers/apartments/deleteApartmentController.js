const {Apartment} = require('../../db.js');

module.exports = async (req, res, next) => {
	const { id }= req.params
	try{
		const apartmentDeleted = await Apartment.findOne({
			where: {
				id
			}
		})
		apartment = await Apartment.destroy({
			where: {
				id
			}
		});
		res.json(apartmentDeleted).status(200);

	}catch(err){
		res.json(err);
		return console.log(err);
	}
};
