import clamp from "./Numbers"

function randomIntRange(min, max){
  //inclusive
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function randomRange(min, max){
  return Math.random() * (max - min + 1) + min;
}

class PRNG{

  constructor(seed=Math.random()){
    this.seed = seed;
  }

  random(){
    let x = Math.sin(this.seed++) * 10000;
    return x - Math.floor(x)
  }

  randomRange(min, max){
    return this.random() * (max - min + 1) + min;
  }
}

export { randomIntRange, randomRange, PRNG};