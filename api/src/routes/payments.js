const router = require('express').Router();
const express = require('express');
const mercadopago = require ('mercadopago');

mercadopago.configure({
    access_token: 'APP_USR-7203165178727227-062815-d9bf402ccd3c1e6165d7662f180cbf25-782464864'   //
  });

// const allPayment = require('../controllers/payment/allPaymentController');     
const addPayment = require('../controllers/payments/addPaymentController.js');     
// const putPayment = require('../controllers/payment/putPaymentController');     
// const findPayment = require('../controllers/payment/findPaymentController');
// const deletePayment = require('../controllers/payment/deletePaymentController');     
// const PaymentService = require('../controllers/payment/PaymentServiceController'); 

router.use(express.json());

router.post("/add/:title/:price/:quantity", addPayment);                               //      http://localhost:3001/payment
// router.put("/", putPayment);                             //      http://localhost:3001/payment

// router.get("/all", allPayment);                          //      http://localhost:3001/payment/all
// router.get("/:id", findPayment);                         //      http://localhost:3001/payment
// router.delete("/:id", deletePayment);                    //      http://localhost:3001/payment

// router.get("/all/:id", paymentService);                  //      http://localhost:3001/payment/all/:id


router.get('/', async function(req,res,next){ // endPoint
    console.log("Estoy en la ruta /Payment")
})

module.exports = router;