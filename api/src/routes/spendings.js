const router = require('express').Router();
const express = require('express');
const auth = require('../utils/auth');
const redirectLoggin = require('./../utils/redirects');

const allSpendings = require('../controllers/spendings/allSpendingsControllers');
const addSpendings = require('../controllers/spendings/addSpendingsController');
const putSpendings = require('../controllers/spendings/putSpendingsController');
const deleteSpendings = require('../controllers/spendings/deleteSpendingsController');

router.use(express.json());
// router.all('*', auth)
router.get('/all', allSpendings); //      http://localhost:3001/spendings/all
router.post('/add', addSpendings); //      http://localhost:3001/spendings/add
router.put('/add', auth, putSpendings); //      http://localhost:3001/spendings/add
router.delete('/del/:id', deleteSpendings); //      http://localhost:3001/spendings/delete

router.get('/', async function (req, res, next) {
	//      endPoint
	console.log('Estoy en la ruta /spendings');
});

module.exports = router;
