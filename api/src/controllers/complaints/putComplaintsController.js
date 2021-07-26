const { Complaints } = require("../../db.js");
const path = require('path');

module.exports = async (req, res, next) => {
    try
    {
        const file = req.files && req.files.image
        if (file === null) file = undefined;
        file && file.mv(path.resolve(`../client/public/uploads/${file.name}`));

        var complaint = JSON.parse(req.body.body);

        await Complaints.update(
        {
            date: complaint.date,
            subject: complaint.subject,
            details: complaint.details,
            importance: complaint.importance,
            image: file && `../../../uploads/${file.name}`
        }, 
        { 
            where: { id: complaint.id }
        }
        );
        return res.status(200).json({success: `Complaint updated successfully`});
    }
    catch(err){
        next(err);
        res.status(500).json(new Error("Error updating the complaint"))
    }
};