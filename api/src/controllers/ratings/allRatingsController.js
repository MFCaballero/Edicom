const { Ratings, Services } = require('../../db');

module.exports = async (req, res, next) => {
	try{
		let data = await Ratings.findAll({
			include: [{
                model: Services,
				attributes: ['title']
            }],
		});
		return res.json(data);
	} 
	catch(err){
        next(err);
		res.json(err);
	}
}