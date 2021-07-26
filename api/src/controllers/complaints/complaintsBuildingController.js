const { Complaints, Buildings } = require('../../db.js');

module.exports = async (req, res, next) => {
    const id = req.params.id;
    try {
        const building = await Buildings.findOne({where: {id}});
        let data = await Complaints.findAll({
            where: {
                buildingId: building.id
            }
        })
        return res.json(data);
    } catch(error) {
        next(error);
        res.json(error);
        return console.log(error);
    }
};