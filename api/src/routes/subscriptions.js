const router = require('express').Router();
const express = require('express');

const allSubscriptions = require('../controllers/subscriptions/getAllSubscriptionsController');     
const addSubscriptions = require('../controllers/subscriptions/createSubscriptionController');     
const putSubscriptions= require('../controllers/subscriptions/updateSubscriptionController');     
const deleteSubscriptions = require('../controllers/subscriptions/deleteSubscriptionController');     
const subscriptionByIdUser = require('../controllers/subscriptions/getSubscriptionbyIdUserController');
const allSubscriptionsBuilding = require('../controllers/subscriptions/AllSubscriptionsBuildingController');

router.use(express.json());
router.get("/all", allSubscriptions);                   //      http://localhost:3001/subscriptions/all
router.post("/", addSubscriptions);                  //      http://localhost:3001/subscriptions
router.put("/", putSubscriptions);                  //      http://localhost:3001/subscriptions
router.delete("/:id", deleteSubscriptions);                  // http://localhost:3001/subscriptions/:id
router.get("/:id", subscriptionByIdUser); 
router.get("/all/:id", allSubscriptionsBuilding);  


router.get('/', async function(req,res,next){       //      endPoint
    console.log("Estoy en la ruta /subscriptions")
})

module.exports = router;