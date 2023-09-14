const { Router } = require('express');
const controller = require('./controller');

const router = Router();

router.post('/createRoom', controller.createRoom);
router.post('/joinRoom', controller.joinRoom);

router.get('/getWords', controller.getWords)

module.exports = router;