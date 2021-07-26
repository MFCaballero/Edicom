const router = require('express').Router();
const express = require('express');

const allApartments = require('../controllers/apartments/allApartmentsController');
const createApartment = require('../controllers/apartments/createApartmentController');
const deleteApartment = require('../controllers/apartments/deleteApartmentController');
const getApartmentById = require('../controllers/apartments/getApartmentByIdController');
const updateApartment = require('../controllers/apartments/updateApartmentController');

router.use(express.json());

router.get('/all/:id', allApartments);
router.get('/:id', getApartmentById);
router.post('/', createApartment);
router.put('/:id', updateApartment);
router.delete('/delete/:id', deleteApartment);

module.exports = router;
