const router = require('express').Router();
const express = require('express');

const allUsers = require('../controllers/users/allUsersController');
const allByBuilding = require('../controllers/users/getAllUsersByBuildingController');
const createUser = require('../controllers/users/createUserController');
//const deleteUser = require('../controllers/users/deleteUserController');
const getUserById = require('../controllers/users/getUserByIdController');
const updateUser = require('../controllers/users/updateUserController');
const getAll = require('../controllers/users/getAllUsersControllers');

router.use(express.json());

router.get('/all/:id', allUsers);
router.get('/allByBuilding/:id',allByBuilding)
router.get('/getall/', getAll);
router.get('/:id', getUserById);
router.post('/', createUser);
router.put('/:id', updateUser);
//router.delete('/delete/:id', deleteUser);

module.exports = router;
