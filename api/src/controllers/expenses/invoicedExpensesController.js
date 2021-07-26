const { Expenses } = require("../../db.js");
const { conn } = require('./../../db')
const { QueryTypes } = require('sequelize');



// Path --> get(http://localhost:3001/expenses/invoicedExpenses)
module.exports = async (req, res, next) => {
    try{
        
        const data = await conn.query(
            'SELECT DISTINCT month, year FROM public."Expenses"', { type: QueryTypes.SELECT });

		return res.json(data)
	} 
	catch(err){
		res.json(err)
		return console.log(err)
	}
}

// fullDate