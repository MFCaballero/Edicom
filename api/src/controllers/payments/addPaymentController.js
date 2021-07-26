const { Payment, Expenses } = require("../../db.js");
const mercadopago = require ('mercadopago');


// Path of this controller -->  http://localhost:3001/payment/add

module.exports = async (req, res, next) => {
    
    let { title, quantity, price } = req.params;
    console.log('paramsssss', req.params)
  
    mercadopago.configure({
      access_token: 'APP_USR-7203165178727227-062815-d9bf402ccd3c1e6165d7662f180cbf25-782464864'   //
    });

    let preference = {
        items: [
          {
            title: title,
            unit_price: parseInt(price),
            quantity: 1,
          }
        ]
      };
      
    mercadopago.preferences.create(preference)
    .then((response) =>
    {
        // console.log(response.body.init_point)
        res.json(response.body.init_point);
    },(err) => {
      console.log('falló la creación del preference', err)
    })
    
    // try
    // {
    //     let newPayment = await Payment.create({
            
    //     });

    //     let expensesSearched = await Expenses.findOne({
    //         where: {
    //             id: expensesId
    //         }
    //     })

    //     await expensesSearched.addPayment(newPayment);

    //     return res.json(newPayment).status(200);
    // }
    .catch((err) => {
        console.log(err);
    });
};