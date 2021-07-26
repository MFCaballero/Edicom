const router = require('express').Router();
const express = require('express');

const addAdmin = require('../controllers/admin/addAdminController');     
const putAdmin = require('../controllers/admin/putAdminController');     
const deleteAdmin = require('../controllers/admin/deleteAdminController');     

router.use(express.json());

router.post("/", addAdmin);                  //      http://localhost:3001/admin
router.put("/:id", putAdmin);                  //      http://localhost:3001/admin
router.delete("/:id", deleteAdmin);                  // http://localhost:3001/admin


router.get('/', async function(req,res,next){       //      endPoint
    console.log("Estoy en la ruta /admin")
})

module.exports = router;