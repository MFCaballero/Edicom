const router = require('express').Router();
const express = require('express');

const loggingIn = require("../controllers/loggings/loggingInController");      
const changePassword = require("../controllers/loggings/changePasswordController");
const sendEmail = require("../controllers/loggings/sendEmailController");
const tokenToEmail = require("../controllers/loggings/tokenToEmailController");
const emailToToken = require("../controllers/loggings/emailToTokenController");
const getUserId = require("../controllers/loggings/getUserIdController");



router.use(express.json());
router.post("/loggingIn", loggingIn);                       //      http://localhost:3001/loggings/loggingIn
router.put("/changepassword", changePassword);              //      http://localhost:3001/loggings/changepassword
router.post("/sendEmail", sendEmail);                       //      http://localhost:3001/loggings/sendEmail
router.post("/tokenToEmail", tokenToEmail);                 //      http://localhost:3001/loggings/tokenToEmail
router.post("/emailToToken", emailToToken);                 //      http://localhost:3001/loggings/emailToToken
router.get("/userId/:token", getUserId);                    //      http://localhost:3001/loggings/getUserId



router.get('/', async function(req,res,next){       //      endPoint
    console.log("Estoy en la ruta /spendings")
})


module.exports = router;