const { Alerts, Buildings } = require("../../db.js");

module.exports = async (req, res, next) => {

    let { date, concept, details, building, importance } = req.body;
    
    try
    {
        let Building = await Buildings.findByPk(building);
        let Alert = await Alerts.create({
            date,
            concept,
            details: details || null,
            importance
        });
        await Building.addAlert(Alert);
        return res.status(200).json({succes: `Alert created successfully`});
    }
    catch(err){
        next(err);
        res.status(500).json(new Error("Error creating the alert"))
    }
};