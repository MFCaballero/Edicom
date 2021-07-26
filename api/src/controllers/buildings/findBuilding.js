const { Buildings } = require('../../db');

module.exports = async (req, res, next) => {
    const id = req.query.id;

	try{
		let data = await Buildings.findAll(
            { where: { id: id } }
        );
		return res.json(data)
	} 
	catch(err){
		res.json(err)
		return console.log(err)
	}
}