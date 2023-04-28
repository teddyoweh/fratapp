function generateCode() {
  const min = 10000;
  const max = 99999;
  const randomNum = Math.floor(Math.random() * (max - min + 1) + min);
  return randomNum.toString();
}

  
module.exports = generateCode