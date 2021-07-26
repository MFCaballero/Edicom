const { Services, Buildings } = require("../../db.js");

module.exports = async (req, res, next) => {
    let findId = req.params.id;
    try {
        let data = await Services.findAll({
                include: [{
                    model: Buildings,
                    attributes: ['name']
                }],
                where: {
                    id: findId,
                }
            });

        return res.json(data)
    }
    catch (err) {
        next(err);
        res.status(500).json(new Error("Error"))
    }

};