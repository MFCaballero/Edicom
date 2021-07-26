const { Complaints, Buildings } = require('../../db');

module.exports = async (req, res, next) => {
	try{
		let data = await Complaints.findAll({
			include: [{
                model: Buildings,
				attributes: ['name']
            }],
		});
		return res.json(data);
	} 
	catch(err){
        next(err);
		res.json(err);
	}
}