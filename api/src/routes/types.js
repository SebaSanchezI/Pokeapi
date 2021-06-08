const {Router} = require('express');
const router = Router();
const {getTypes} = require('../controllers/controllers.js')

router.use('/', getTypes );


module.exports = router;