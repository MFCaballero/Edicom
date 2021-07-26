const router = require('express').Router();
const express = require('express');

const allComplaints = require('../controllers/complaints/allComplaintsController');
const addComplaint = require('../controllers/complaints/addComplaintsController');
const putComplaint = require('../controllers/complaints/putComplaintsController');
const deleteComplaint = require('../controllers/complaints/deleteComplaintsController');
const complaintsBuilding = require('../controllers/complaints/complaintsBuildingController');
const findComplaint = require('../controllers/complaints/findComplaintController');
const seenComplaint = require('../controllers/complaints/seenComplaintController');
const stateComplaint = require('../controllers/complaints/stateComplaintController');
const userComplaints = require('../controllers/complaints/userComplaintsController');

router.use(express.json());

router.get("/all", allComplaints);
router.post("/", addComplaint);
router.put("/", putComplaint);
router.put("/:id", seenComplaint);
router.put("/state/:id", stateComplaint);
router.delete("/:id", deleteComplaint);
router.get("/all/:id", complaintsBuilding);
router.get("/:id", findComplaint);
router.get('/user/:id', userComplaints);


router.get('/', async function(req,res,next){       //      endPoint
    console.log("Estoy en la ruta /complaints")      
})

module.exports = router;