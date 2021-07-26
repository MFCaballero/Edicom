const { Spendings } = require("../../db.js");


// delete(http://localhost:3001/spendings/delete/del/:id)
module.exports = async (req, res, next) => {

    console.log(req.params)

    let {id} = req.params;
    
    try
    {
        await Spendings.destroy( {
            where: {
                id,
            }
        });
        
        const spendingList = await Spendings.findAll()

        return res.json(spendingList).status(200);
    }
    catch(err){
       /*  console.error(err); */
        // res.json(err);
        next(err);
    }
};