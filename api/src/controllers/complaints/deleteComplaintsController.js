const { Complaints } = require('../../db.js');

module.exports = async (req, res, next) => {
    let deletionId = req.params.id;
    try {
        await Complaints.destroy({
            where: {
                id: deletionId,
            }
        });
        
        return res.json({success: 'Complaint successfully deleted'}).status(200);
        
    } catch (error) {
        next(error);
        res.status(500).json(new Error('Error when deleting this complaint'));
    }
};