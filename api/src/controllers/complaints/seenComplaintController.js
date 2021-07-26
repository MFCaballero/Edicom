const { Complaints } = require("../../db.js");
const path = require('path');

module.exports = async (req, res, next) => {
    const id = req.params.id
    try
    {
        await Complaints.update(
        {
            seen: true
        }, 
        { 
            where: { id: id }
        }
        );
        return res.status(200).json({success: `Complaint updated successfully`});
    }
    catch(err){
        next(err);
        res.status(500).json(new Error("Error updating the complaint"))
    }
};