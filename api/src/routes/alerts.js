const router = require('express').Router();
const express = require('express');

const allAlerts = require('../controllers/alerts/allAlertsController');     
const addAlert = require('../controllers/alerts/addAlertsController');     
const putAlert = require('../controllers/alerts/putAlertsController');     
const deleteAlerts = require('../controllers/alerts/deleteAlertsController');     
const alertsBuilding = require('../controllers/alerts/alertsBuildingController'); 
const findAlert = require('../controllers/alerts/findAlertController');
const sendEmail = require('../controllers/alerts/sendEmailController');      

router.use(express.json());
router.get("/all", allAlerts);                   //      http://localhost:3001/alerts/all
router.post("/", addAlert);                  //      http://localhost:3001/alerts
router.put("/", putAlert);                  //      http://localhost:3001/alerts
router.delete("/:id", deleteAlerts);                  // http://localhost:3001/alerts
router.get("/all/:id", alertsBuilding);     //http://localhost:3001/alerts/all/:id
router.get("/:id", findAlert);               // http://localhost:3001/alerts
router.post('/sendEmail', sendEmail)

router.get('/', async function(req,res,next){       //      endPoint
    console.log("Estoy en la ruta /alerts")
})

module.exports = router;