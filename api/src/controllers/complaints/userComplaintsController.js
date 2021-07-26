const { Complaints, User } = require('../../db');

module.exports = async (req, res, next) => {
	try{
		const id = req.params.id;
		console.log("sadasdfasdfasdfsdfasdfasdfasdfs", id)
		let data = await Complaints.findAll({
			include: [{
                model: User,
				attributes: ['name']
            }],
            where: {
                userId: id
            }
		});
		return res.json(data);
	} 
	catch(err){
        next(err);
		res.json(err);
	}
}