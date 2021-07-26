const { Buildings } = require('../../db');

module.exports = async (req, res, next) => {
	try{
		let data = await Buildings.findAll({
			order: [['updatedAt', 'DESC']]
		});
		return res.json(data)
	} 
	catch(err){
		res.json(err)
		return console.log(err)
	}
}