const { Complaints, Buildings } = require('../../db.js');

module.exports = async (req, res, next) => {
    const id = req.params.id;
    try {
        let data = await Complaints.findAll({
            include: [{
                model: Buildings,
                attributes: ['name']
            }],
            where: {
                id
            }
        });

        return res.json(data);

    } catch(error) {
        next(error);
        res.json(error);
        return console.log(error + 'This complaint does not exists')
    }
};