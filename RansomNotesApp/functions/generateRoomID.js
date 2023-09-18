const generateRoomID = () => {
  //removed vowels and numbers/letters that look similar
  const characters = ['B', 'C', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'M', 'N', 'P', 'Q', 'R', 'T', 'V', 'W', 'X', 'Z', '2', '3', '4', '5', '6', '7', '8', '9'];

  let id = '';
  let chars = 6;

  while (chars > 0) {
    const randChar = Math.floor(Math.random() * characters.length);
    id += characters[randChar];
    chars -= 1;
  }

  return id;
};

module.exports = generateRoomID;