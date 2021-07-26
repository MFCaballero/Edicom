const { Ratings } = require("../../db.js");

module.exports = async (req, res, next) => {
    
    let delId = req.params.id;   
    
    try
    {   
        await Ratings.destroy( {
            where: {
                id: delId,
            }
        });

        return res.json({succes: `Rating deleted successfully`}).status(200);
    }
    catch(err){
        next(err);
        res.status(500).json(new Error("Error deleting the rating"))
    }

};