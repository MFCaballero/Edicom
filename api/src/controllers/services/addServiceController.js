const { Services, Buildings } = require("../../db.js");

module.exports = async (req, res, next) => {

    let { title, provider, enrollment, contact, detail, buildingId } = req.body;
    
    try
    {
        let Building = await Buildings.findByPk(buildingId);
        let Service = await Services.create({
            title,
            provider,
            enrollment: enrollment || null,
            contact,
            detail: detail || null,
        });
        await Building.addService(Service);
        return res.status(200).json({succes: `Service created successfully`});
    }
    catch(err){
        next(err);
        res.status(500).json(new Error("Error creating the new service"))
    }
};