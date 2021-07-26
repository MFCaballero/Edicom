const router = require('express').Router();
const express = require('express');

const getAllAmenities = require('../controllers/amenities/getAllAmenitiesController');
const allAmenities = require('../controllers/amenities/allAmenitiesController');
const createAmenitie = require('../controllers/amenities/createAmenitieController');
const updateAmenitie = require('../../src/controllers/amenities/updateAmenitieController');
const deleteAmenitie = require('../../src/controllers/amenities/deleteAmenitieController');

router.use(express.json());

router.get('/all/:id', getAllAmenities);
router.get('/', allAmenities);
router.post('/', createAmenitie);
router.put('/:id', updateAmenitie);
router.delete('/:id', deleteAmenitie);

module.exports = router;
