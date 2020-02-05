const express = require('express');
const router = express.Router();

const mainPageController = require('../controllers/main');

router.get('/', mainPageController.manageSlash);
router.get('/home', mainPageController.getMainPage);
router.post('/', mainPageController.postMainPage);
router.get('/results', mainPageController.getResults);
router.post('/results', mainPageController.postDeleteHistory);

module.exports = router;