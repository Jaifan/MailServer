const express = require('express');
const {check} = require('../controller/mailcontroller')

const router = express.Router();

router.route('/').post(check);

module.exports = router;