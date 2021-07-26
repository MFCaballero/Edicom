const { Complaints, Buildings, User } = require("../../db.js");
const path = require('path');

module.exports = async (req, res, next) => {
    try
    {
        const file = req.files && req.files.image
        file && file.mv(path.resolve(`../client/public/uploads/${file.name}`));
        var complaint = JSON.parse(req.body.body); 
        var buildingCurrent = await Buildings.findByPk(complaint.id_Buildings);
        var userCurrent = await User.findByPk(complaint.id_Users);
        var complaint = await Complaints.create({
            date: complaint.date,
            subject: complaint.subject,
            details: complaint.details,
            importance: complaint.importance,
            image: (file && `../../../uploads/${file.name}`) || "../../../uploads/office_building.png"
        });
        await buildingCurrent.addComplaint(complaint);
        await userCurrent.addComplaint(complaint);
        return res.status(200).json({success: `Complaint created successfully`});
    }
    catch(err){
        next(err);
        res.status(500).json(new Error("Error creating the complaint"))
    }
};