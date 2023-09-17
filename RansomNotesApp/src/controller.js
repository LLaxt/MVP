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

const setPrompt = async (req, res) => {
  const room = req.body.room_id;
  const getRandPrompt = `SELECT prompt_id FROM prompts WHERE prompt_id NOT IN (SELECT prompt_id FROM room_prompts WHERE room_id = $1) ORDER BY RANDOM() LIMIT 1;`;
  const updateCurrentPrompt = 'UPDATE rooms SET current_prompt = $1 WHERE room_id = $2;';
  const addToRoomPrompts = 'INSERT INTO room_prompts (prompt_id, room_id) VALUES($1, $2);';
  try {
    const result = await pool.query(getRandPrompt, [room]);
    const randPromptID = result.rows[0].prompt_id;
    await pool.query(updateCurrentPrompt, [randPromptID, room]);
    await pool.query(addToRoomPrompts, [randPromptID, room]);
    res.sendStatus(201);
  } catch (err) {
    console.error(err);
  }
}

const joinRoom = async (req, res) => {
  const room = req.body.room_id.toUpperCase();
  const name = req.body.username;
  const getMaxPlayers = 'SELECT max_players FROM rooms WHERE room_id = $1;';
  const countPlayers = 'SELECT COUNT(*) FROM players WHERE room_id = $1;';
  const addPlayerQuery = `INSERT INTO players (room_id, username) VALUES($1, $2) RETURNING player_id;`;
  try {
    const maxResult = await pool.query(getMaxPlayers, [room]);
    const countResult = await pool.query(countPlayers, [room]);
    const maxPlayers = parseInt(maxResult.rows[0].max_players);
    const numPlayers = parseInt(countResult.rows[0].count);
    if (numPlayers === maxPlayers) {
      res.send('FULL');
    } else {
      const result = await pool.query(addPlayerQuery, [ room, name ]);
      const player_id = result.rows[0].player_id;
      const responseObj = {
        room_id: room,
        player_id: player_id,
      };
      res.send(responseObj);
    }
  } catch (err) {
    res.send('INVALID');
    console.error(err);
  }
};

const getPrompt = async (req, res) => {
  const room = req.query.room_id;
  const getNewPrompt = 'SELECT prompt FROM prompts LEFT JOIN rooms ON rooms.current_prompt = prompts.prompt_id WHERE room_id = $1;';
  try {
    const prompt = await pool.query(getNewPrompt, [room]);
    res.send(prompt.rows[0].prompt_id);
  } catch (err) {
    console.error(err);
  }
};

const getPlayers = async (req, res) => {
  const room = req.body.room_id;
  const returnPlayers = 'SELECT username, player_id FROM players where room_id = $1;';
  const checkStart = 'SELECT current_round FROM rooms where room_id=$1;';
  try {
    const players = await pool.query(returnPlayers, [room]);
    const round = await pool.query(checkStart, [room]);
    const returnObj = {
      round: round.rows[0],
      players: players.rows,
    }
    res.send(returnObj);
  } catch (err) {
    console.error(err);
  }
};

const setNextRound = async (req, res) => {
  const room = req.body.room_id;
  const updateRound = 'UPDATE rooms SET current_round = current_round + 1 WHERE room_id = $1;';
  try {
    await pool.query(updateRound, [room]);
    res.sendStatus(201);
  } catch(err) {
    console.error(err);
  }
};


//ADD A TRANSACTION TO AVOID CONFLICT
const getWords = async (req, res) => {
  const room = req.query.room_id;
  const player = parseInt(req.query.player_id);
  const deleteUsedWords = `DELETE FROM room_words WHERE room_id = $1 AND player_id = $2 AND submitted = true;`;
  const deleteVotes = `UPDATE players SET current_votes = 0 WHERE player_id = $1;`;
  const getNewWords = `SELECT word_id, word FROM words WHERE word_id NOT IN (SELECT word_id FROM room_words WHERE room_id = $1) ORDER BY RANDOM() LIMIT 60;`;
  const addWordsToRoom = `INSERT INTO room_words (room_id, player_id, word_id) VALUES ($1, $2, $3);`;
  try {
    await pool.query(deleteUsedWords, [room, player]);
    await pool.query(deleteVotes, [player]);
    const words = await pool.query(getNewWords, [room]);
    for (let i = 0; i < words.rows.length; i++) {
      await pool.query(addWordsToRoom, [room, player, words.rows[i].word_id]);
    }
    res.send(words.rows);
  } catch (err) {
    console.error(err)
  };
};

//WRITE ANSWER-(FUTURE FEATURE: SWAP WORDS)

const submitResponse = async (req, res) => {
  const submission = req.body.submission;
  //const word_ids = Object.keys(req.body.submission);
  const player = req.body.player_id;
  const room = req.body.room_id;
  const submit = 'UPDATE room_words SET x = $1, y = $2, submitted = $3 WHERE room_id = $4 and player_id = $5 and word_id = $6;';
  try {
    for (let key in submission) {
      const values = [submission[key].x, submission[key].y, true, room, player, key];
      await pool.query(submit, values);
    }
  } catch (err) {
    console.error(err);
  };
  res.sendStatus(201);
}

const getResponses = async (req, res) => {
  const room = req.query.room_id;
  const responseQuery = 'SELECT player_id, word, room_words.word_id, x, y FROM room_words LEFT JOIN words ON room_words.word_id = words.word_id WHERE room_id = $1 and submitted = true ORDER BY RANDOM();';
  try {
    const responses = await pool.query(responseQuery, [room]);
    res.send(responses.rows);
    } catch (err) {
    console.error(err);
  };
};

const submitVote = async (req, res) => {
  const room = req.body.room_id;
  const player = req.body.player_id;
  const submitVote = 'UPDATE players SET current_votes = current_votes + 1 WHERE player_id = $1 AND room_id = $2;';
  try {
    await pool.query(submitVote, [player, room]);
    res.sendStatus(201);
    } catch (err) {
    console.error(err);
  };
};

const getRound = async (req, res) => {
  const room = req.query.room_id;
  const checkMax = 'SELECT rounds, current_round FROM rooms WHERE room_id = $1;';
  try {
    const roundData = await pool.query(checkMax, [room]);
    const { current_round, rounds } = roundData.rows[0];
    if ( current_round > rounds) {
      res.send('END');
    } else {
      const returnObj = { current_round };
      res.send(returnObj);
    }
  } catch(err) {
    console.error(err);
  }
}

const getWinners = async (req, res) => {
  const room = req.query.room_id;
  const getPlayers = 'SELECT player_id, current_votes, username FROM players WHERE room_id = $1;';
  const getCard = 'SELECT room_words.word_id, word, x, y FROM room_words LEFT JOIN words ON room_words.word_id = words.word_id WHERE room_id = $1 AND player_id = $2 AND submitted = true;';
  const addToFinalScore = 'UPDATE players SET score = score + 1 WHERE room_id = $1 AND player_id = $2;';
  const winners = [];
  try {
    const votes = await pool.query(getPlayers, [room]);
    let highestVotes = 0;
    for (let i = 0; i < votes.rows.length; i++) {
      if (votes.rows[i].current_votes > highestVotes) {
        highestVotes = votes.rows[i].current_votes;
      }
    }
    for (let i = 0; i < votes.rows.length; i++) {
      if (votes.rows[i].current_votes === highestVotes) {
        const wordData = await pool.query(getCard, [room, votes.rows[i].player_id]);
        await pool.query(addToFinalScore, [room, votes.rows[i].player_id])
        const winnerData = {
          username: votes.rows[i].username,
          player_id: votes.rows[i].player_id,
          words: wordData.rows,
        }
        winners.push(winnerData);
      }
    }
    res.send(winners);
  } catch (err) {
    console.error(err);
  };
};

/*

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
  setPrompt,
  getPlayers,
  getPrompt,
  setNextRound,
  getRound,
  getWords,
  submitResponse,
  getResponses,
  submitVote,
  getWinners,
};