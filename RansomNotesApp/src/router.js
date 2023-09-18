const { Router } = require('express');
const controller = require('./controller');

const router = Router();

router.post('/createRoom', controller.createRoom);
router.post('/joinRoom', controller.joinRoom);

router.post('/setPrompt', controller.setPrompt);
router.get('/getPrompt', controller.getPrompt);

router.get('/getPlayers', controller.getPlayers);
router.post('/setNextRound', controller.setNextRound);
router.get('/getRound', controller.getRound);

router.get('/getWords', controller.getWords);
router.post('/submitResponse', controller.submitResponse);

router.get('/getResponses', controller.getResponses);
router.post('/submitVote', controller.submitVote);

router.get('/getWinners', controller.getWinners);

module.exports = router;