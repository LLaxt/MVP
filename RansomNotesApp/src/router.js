const { Router } = require('express');
const controller = require('./controller');

const router = Router();

router.post('/createRoom', controller.createRoom);
router.post('/joinRoom', controller.joinRoom);

router.get('/getWords', controller.getWords);
router.post('/submitResponse', controller.submitResponse);

module.exports = router;