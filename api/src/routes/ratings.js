const router = require('express').Router();
const express = require('express');

const allRatings = require('../controllers/ratings/allRatingsController');     
const addRating = require('../controllers/ratings/addRatingController');     
const putRating = require('../controllers/ratings/putRatingController');     
// const findRating = require('../controllers/ratings/findRatingController');
const deleteRating = require('../controllers/ratings/deleteRatingController');     
const ratingsService = require('../controllers/ratings/ratingsServiceController'); 

router.use(express.json());

router.post("/", addRating);                            //      http://localhost:3001/ratings
router.put("/", putRating);                             //      http://localhost:3001/ratings

router.get("/all", allRatings);                         //      http://localhost:3001/ratings/all
// router.get("/:id", findRating);                      //      http://localhost:3001/ratings
router.delete("/:id", deleteRating);                    //      http://localhost:3001/ratings

router.get("/all/:id", ratingsService);                 //      http://localhost:3001/ratings/all/:id


router.get('/', async function(req,res,next){ // endPoint
    console.log("Estoy en la ruta /Ratings")
})

module.exports = router;