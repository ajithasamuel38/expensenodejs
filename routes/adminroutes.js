const express = require('express');

const adminController = require('../controllers/admin');

const router = express.Router();

router.get('/user/signup', adminController.getAll);

 router.post('/user/signup', adminController.postuserdetails);

 module.exports = router;