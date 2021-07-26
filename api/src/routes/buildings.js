const router = require('express').Router();
const express = require('express');


const allBuildings = require("../controllers/buildings/allBuildings");     // import the controllers
const addBuilding = require("../controllers/buildings/addBuilding");
const delBuilding = require("../controllers/buildings/delBuilding");
const putBuilding = require("../controllers/buildings/putBuilding");
const findBuilding = require("../controllers/buildings/findBuilding");   



const getSesion = require("../controllers/buildings/getSesion");   




router.use(express.json());

router.get("/all", allBuildings);       //      get -> localhost3001/buildings/all
router.post("/", addBuilding);       //      post -> localhost3001/buildings
router.delete("/:id", delBuilding);       //      DELETE -> localhost3001/buildings
router.put("/", putBuilding);       //      PUT -> localhost3001/buildings
router.get('/findBuilding', findBuilding);       //      GET -> localhost3001/buildings/findBuilding?id=... to find a Building data



router.get("/getSesion/:token", getSesion);       //      get -> localhost3001/buildings/all



router.get('/', async function (req, res, next) {
	// endPoint
	res.send("I'm in the route /buildings");
});

module.exports = router;
