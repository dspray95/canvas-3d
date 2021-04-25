import { PRNG } from "./Random"

class Shuffler{

  constructor(seed=Math.random){
    this.PRNG =  new PRNG(seed)
  }

  shuffle(list){
    return list.sort(() => this.PRNG.random() - 0.5)
  }
}



export { Shuffler }