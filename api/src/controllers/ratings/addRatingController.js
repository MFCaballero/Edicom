const { Services, Ratings, User } = require("../../db.js");

module.exports = async (req, res, next) => {

    let { rating, serviceId, userId } = req.body;
    
    try
    {
        let user = await User.findByPk( userId );
        let service = await Services.findOne({where: {id: serviceId},
			include: [{
                model: Ratings,
            }]});
        if(service.dataValues.ratings.length === 0 || !service.dataValues.ratings.find(e => e.userId === userId)){
            let newRating = await Ratings.create({
                rating
            });
    
            await service.addRating(newRating);
            await user.addRating(newRating);
    
            return res.status(200).json(newRating);
        }else{
            return res.status(400).json({error: "usuario ya puntuo"})
        }
        
    }
    catch(err){
        next(err);
        res.status(500).json(new Error("Error creating the new rating"))
    }
};