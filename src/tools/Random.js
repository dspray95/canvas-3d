function randomIntRange(min, max){
  //inclusive
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function randomRange(min, max){
  return Math.random() * (max - min + 1) + min;
}

export { randomIntRange, randomRange};