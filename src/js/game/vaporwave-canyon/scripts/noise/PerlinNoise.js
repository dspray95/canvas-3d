import { Shuffler } from "../../../../tools/List";
import { Vector2D } from "../../../../engine/rendering/objects/primitives/Vector2D";

class PerlinNoise{

  constructor(seed=Math.random()){
    this.permutationTable = this.makePermutationTable(seed)
  }

  makePermutationTable(seed){
    let shuffler = new Shuffler(seed)
    let table = [];
    for(let i = 0; i < 256; i++){
      table.push(i)
    }
    table = shuffler.shuffle(table)
    for(let i = 0; i < 256; i++){
      table.push([table[i]])
    }
    return table
  }

  getConstantVector(v){
    //v is the value from the permutation table
    let h = v & 3;
    if(h == 0)
      return new Vector2D(1.0, 1.0);
    else if(h == 1)
      return new Vector2D(-1.0, 1.0);
    else if(h == 2)
      return new Vector2D(-1.0, -1.0);
    else
      return new Vector2D(1.0, -1.0);
  }

  lerp(t, a1, a2){
    return a1 + t*(a2-a1);
  }

  ease(t){
    return ((6*t - 15)*t + 10)*t*t*t;
  }

  getNoise(x, y){
    let X = Math.floor(x) & 255
    let Y = Math.floor(y) & 255

    let xf = x - Math.floor(X)
    let yf = y - Math.floor(Y)

    let topRight = new Vector2D(xf - 1.0, yf - 1.0)
    let topLeft = new Vector2D(xf, yf - 1.0)
    let bottomRight = new Vector2D(xf - 1.0, yf)
    let bottomLeft = new Vector2D(xf, yf)
    
    let P = this.permutationTable
    let valueTopRight = P[P[X+1]+Y+1]
    let valueTopLeft = P[P[X]+Y+1]
    let valueBottomRight = P[P[X+1]+Y]
    let valueBottomLeft = P[P[X]+Y]

    let dotTopRight = topRight.dot(this.getConstantVector(valueTopRight));
    let dotTopLeft = topLeft.dot(this.getConstantVector(valueTopLeft));
    let dotBottomRight = bottomRight.dot(this.getConstantVector(valueBottomRight));
    let dotBottomLeft = bottomLeft.dot(this.getConstantVector(valueBottomLeft));

    let u = this.ease(xf);
    let v = this.ease(yf);
    
    return this.lerp(u,
      this.lerp(v, dotBottomLeft, dotTopLeft),
      this.lerp(v, dotBottomRight, dotTopRight)
    );
  }
}

export { PerlinNoise }