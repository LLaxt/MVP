export default function getRandomAngle (max) {
  return parseFloat(Math.random() * max * (Math.random() < 0.5 ? -1 : 1)).toFixed(2);
}

module.exports = getRandomAngle;