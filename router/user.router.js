const express = require('express');
const { getUserListWithFilter, addUser } = require('../controller/userControllers');
const router = express.Router();

router.post('/add/user',addUser);

router.post('/get/users',getUserListWithFilter);

module.exports = router