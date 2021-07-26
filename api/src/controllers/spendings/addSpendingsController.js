const { Spendings, Buildings } = require("../../db.js");

// Path of this controller -->  http://localhost:3001/spendings/add

module.exports = async (req, res, next) => {

    let {date, concept, details, supplier, amount, building} = req.body;
    
    console.log(building)

    try
    {
        let spending = await Spendings.create({
            date: date,
            concept: concept,
            details: details,
            supplier: supplier,
            amount: amount,
        });

        let buildingSearched = await Buildings.findOne({
            where: {
                id: building
            }
        })

        await buildingSearched.addSpending(spending);

        const spendingList = await Spendings.findAll();

        return res.json(spendingList).status(200);
    }
    catch(err){
       /*  console.error(err); */
        res.json(err);
    }
};