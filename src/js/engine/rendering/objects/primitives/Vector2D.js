class Vector2D {

  constructor(x, y){
    this.x = x;
    this.y = y
  }

  dot(other){
    return this.x * other.x + this.y * other.y;
  }

}

export { Vector2D }