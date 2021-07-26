const router = require('express').Router();
const express = require('express');

const allServices = require('../controllers/services/allServicesController');     
const addService = require('../controllers/services/addServiceController');     
const putService = require('../controllers/services/putServiceController');     
const deleteService = require('../controllers/services/deleteServiceController');     
const servicesBuilding = require('../controllers/services/servicesBuildingController'); 
const findService = require('../controllers/services/findServiceController');

router.use(express.json());
router.get("/all", allServices);                   //      http://localhost:3001/services/all
router.post("/", addService);                  //      http://localhost:3001/services
router.put("/", putService);                  //      http://localhost:3001/services
router.delete("/:id", deleteService);                  // http://localhost:3001/services
router.get("/all/:id", servicesBuilding);     //http://localhost:3001/services/all/:id
router.get("/:id", findService);               // http://localhost:3001/services


router.get('/', async function(req,res,next){ // endPoint
    console.log("Estoy en la ruta /services")
})

module.exports = router;