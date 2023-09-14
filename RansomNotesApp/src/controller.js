const pool = require('../db/db');
const generateID = require('../functions/generateRoomID');

//TO DO: VALIDATE WHETHER ROOM_ID ALREADY EXISTS
const createRoom = async (req, res) => {
  const room = [ generateID() ];
  const userData = [ room[0], req.body.username, true ];
  const createRoomQuery = `INSERT INTO rooms (room_id) VALUES($1);`;
  const addPlayerQuery = `INSERT INTO players (room_id, username, host) VALUES($1, $2, $3) RETURNING player_id;`;
  try {
    await pool.query(createRoomQuery, room);
    const result = await pool.query(addPlayerQuery, userData);
    const player_id = result.rows[0].player_id;
    const responseObj = {
      room_id: room[0],
      player_id,
    };
    res.send(responseObj);
  } catch (err) {
    console.error(err);
  }
};
//TO DO: VALIDATE THAT THE ROOM EXISTS
const joinRoom = async (req, res) => {
  const room = req.body.room_id.toUpperCase();
  const name = req.body.username;
  const userData = [ room, name ];
  const addPlayerQuery = `INSERT INTO players (room_id, username) VALUES($1, $2) RETURNING player_id;`;
  try {
    const result = await pool.query(addPlayerQuery, userData);
    const player_id = result.rows[0].player_id;
    const responseObj = {
      room_id: room,
      player_id: player_id,
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
Output: current_round, current_prompt*/


/*

-WRITE ANSWER-(FUTURE FEATURE: SWAP WORDS)
DELETE: room_words where submitted = true,
PUT/PATCH: update player current votes to 0
POST: ADD ROOM WORDS TO DB - use transaction to get 50 words not in room_words
Input: room_id, player_id
Output: { username, player_id, words: [word_id, word] }

POST: SUBMIT RESPONSE - submit answer
Input: room_id, player_id, [word_id, x, y, submitted=true]
Output: 201 (side effect save above data and set submitted=true for words in room_words)*/

//ADD A TRANSACTION TO AVOID CONFLICT
const getWords = async (req, res) => {
  console.log('Request: ',req.query);
  const room = req.query.room_id;
  const player = req.query.player_id;

  //FIX DELETE USED WORDS QUERY
  const deleteUsedWords = `DELETE FROM room_words WHERE room_id = $1 AND player_id = $2 AND submitted = true;`;
  const deleteVotes = `UPDATE players SET current_votes = 0 WHERE player_id = $1;`;
  const getNewWords = `SELECT word_id, word FROM words WHERE word_id NOT IN (SELECT word_id FROM room_words WHERE room_id = $1) ORDER BY RANDOM() LIMIT 50;`;
  const addWordsToRoom = `INSERT INTO room_words (room_id, player_id, word_id) SELECT $1, $2, word_id FROM UNNEST($3) as word_id;`; //room,player,word_ids
  try {
    await pool.query(deleteUsedWords, [room, player]);
    await pool.query(deleteVotes, [player]);
    const words = await pool.query(getNewWords, [room]);
    console.log('Words: ', words.rows);
    res.send(words.rows);
  } catch (err) {
    console.error(err)
  };
};


/*
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
  joinRoom,
  getWords,
};