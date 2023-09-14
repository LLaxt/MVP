const pool = require('../db/db');
const generateID = require('../functions/generateRoomID');

/*
Queries/page needed:
-INDEX-
POST: CREATE ROOM - Create row in: rooms, players
Input: username
Output: 201, room_id, player_id, username

POST: JOIN ROOM - Create row in: players
Input: username, roomID
Output: IF INVALID: 'Please enter a valid room ID'
        IF ROOM IS FULL: 'This room is currently full'
        IF VALID: 201, room_id, player_id, username
*/

//TO DO: VALIDATE WHETHER CODE ALREADY EXISTS
const createRoom = async (req, res) => {
  const room = [ generateID() ];
  const userData = [ room[0], req.body.username, true ];
  const createRoomQuery = `INSERT INTO rooms (room_id) VALUES($1);`;
  const addPlayerQuery = `INSERT INTO players (room_id, username, host) VALUES($1, $2, $3) RETURNING player_id;`;

  try {
    await pool.query(createRoomQuery, room);
    const player_id = await pool.query(addPlayerQuery, userData);
    const responseObj = {
      room_id: room,
      player_id
    };
    res.send(responseObj);
  } catch (err) {
    console.error(err);
  }
};


/*
-WAITING ROOM-
GET: GET PLAYERS WAIT START- Get all players in room and check current_round
Input: roomID
Output: array: username, playerID, current_round

POST: START GAME - host starts game, set first prompt
Input: roomID
Output: current_round, current_prompt

-WRITE ANSWER-(FUTURE FEATURE: SWAP WORDS)
DELETE: room_words where submitted = true,
PUT/PATCH: update player current votes to 0
POST: ADD ROOM WORDS TO DB - use transaction to get 50 words not in room_words
Input: room_id, player_id
Output: { username, player_id, words: [word_id, word] }

POST: SUBMIT RESPONSE - submit answer
Input: room_id, player_id, [word_id, x, y, submitted=true]
Output: 201 (side effect save above data and set submitted=true for words in room_words)

-VIEW ANSWERS-
GET: GET ALL SUBMISSIONS - Room_words where room_id and submitted
Input: room_id
Output: player_id,

PUT/PATCH: VOTE - Add to selected player_id score
Input: room_id, player_id
Output: 201 (side effect player_id current_votes++)

-TURN WINNER-
GET: GET WINNERS AND THEIR RESPONSES, ADD +1 TO PLAYER SCORES
Input: room_id  (calculate winners)
Output: { winning player_ids, usernames, room_words submitted, words, x, y }

GET CHECK ROUND
Input: room_id
Output: current_round, rounds

-FINAL WINNER-
Input: room_id
Output: player_id, username, score

-BACK TO MAIN MENU-
DELETE - ROOM_ID, ALL ROWS WITH ROOM_ID IN ALL TABLES

*/

module.exports = {
  createRoom,
};