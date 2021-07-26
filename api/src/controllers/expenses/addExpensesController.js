const { conn } = require('./../../db')
const { MONTHS } = require('./../../utils/constants')
const { Spendings, Expenses, Apartment } = require("../../db.js");


// Path --> Post(http://localhost:3001/expenses/add/:month/:year)
module.exports = async (req, res, next) => {

    console.log("generando las expensassssss")

    const {month, year} = req.params;

    const t = await conn.transaction();

    try{

        const arrSpending = await Spendings.findAll();
        const arrApartments = await Apartment.findAll(
            {
                where: {
                    buildingId: 1               //Harcodeamos el edificio con el id = 1 
                }                               //pero hay que agregar el filtro del edificio
            }
        );

        const spendingFiltered = arrSpending.filter( (spending) => 
        {
            if(spending.date.getMonth() === parseInt(month, 10) && spending.date.getFullYear() === parseInt(year, 10)) return true;
        })

        const totalSurfaceQuery = await Apartment.findAll({
            // where: {buildingId: 1},
            attributes: [
              [conn.fn('SUM', conn.col('mt2')), 'totalMt2'],
            ]
          });

        const totalSurface = totalSurfaceQuery[0].dataValues.totalMt2           //total m2 of the building

        const totalSpendingAmount = spendingFiltered.map((data) => data.amount).reduce((a, b) => a + b);
        // const expenseAmount = totalSpendingAmount / arrApartments.length;
    

        const arrExpensesPromises = [];                 //make an array with the promises of new Expenses
        const arrAsignedExpenses = []; 

        for (const apartment of arrApartments) {

            // console.log("primer for")
            arrExpensesPromises.push(Expenses.create(
                {
                    month: MONTHS[month],
                    year: year,
                    amount: totalSpendingAmount / totalSurface * apartment.mt2,
                }, { transaction: t }))
        }


        Promise.all(arrExpensesPromises)
            .then(expenses => {                         //expenses is an array with the new expenses created
                
                // console.log(expenses)
                // console.log('Primer PromiseAll')
                let i = 0;
                for (const apartment of arrApartments) {

                    // console.log(expenses[i])
                    // console.log("segundo for")
                    arrAsignedExpenses.push(apartment.addExpense(expenses[i], { transaction: t }))
                    i++;                    
                }
                Promise.all(arrAsignedExpenses)
                    .then(async () => {
                        // console.log('Segundo PromiseAll')
                        await t.commit()
                        console.log('antes de devolver un 200 de expensas generadas')
                        return res.json(`Expensas para el mes ${MONTHS[month]} cargadas`)
                    },
                    async err => {
                        await t.rollback()
                        console.log(err)
                        return res.status(403).json(err)
                    }
                    )
            },
                async err => {
                    await t.rollback()
                    console.log(err)
                    return res.status(403).json(err)
                }
            )

    } 
    catch(err){
        await t.rollback()
        console.log(err)
        return res.status(403).json(err)
    }
    
    // axios.get("http://localhost:3001/spendings/all")     // se puede ver de reutilizar este endpoint

};