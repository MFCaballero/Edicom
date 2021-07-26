const { Ratings } = require("../../db.js");

module.exports = async (req, res, next) => {

    let { id, rating } = req.body;
    try
    {
        let ratingChanged = await Ratings.update({
            rating
        },
        { where: { id: id } });

        return res.json(ratingChanged).status(200);
    }
    catch(err){
        next(err);
        res.status(500).json(new Error("Error updating"))
    }
};