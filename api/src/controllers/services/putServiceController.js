const { Services } = require("../../db.js");

module.exports = async (req, res, next) => {

    let {id} = req.body;
    try
    {
        let alert = await Services.update({
            accepted: true
        },
        { where: { id: id } });

        return res.json(alert).status(200);
    }
    catch(err){
        next(err);
        res.status(500).json(new Error("Error updating"))
    }
};