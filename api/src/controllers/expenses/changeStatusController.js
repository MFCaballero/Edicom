const { Expenses } = require('../../db.js');
const expensesByApartmentNameController = require('./expensesByApartmentNameController.js');
// expenses/changeStatus/1
// Path of this controller --> Put(http://localhost:3001/expenses/changeStatus/:id)
module.exports = async (req, res, next) => {
	let { id } = req.params;

	try {
        const expense = await Expenses.findOne(
            {
                where: { id: id}
            }
        )

        if(expense.status === 'Adeudada'){
            await expense.update({
                status: 'Pagada'
            })
        }
        else{
            await expense.update({
                status: 'Adeudada'
            })
        }

		return res.json(expense.id).status(200);

    } catch (err) {
		console.log(err)
		res.json(err);
	}
};
