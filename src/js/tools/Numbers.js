function clamp(num, min, max) {
  return num <= min ? min : num >= max ? max : num;
}

function inverseLerp(x, y, a){
 return clamp((a - x) / (y - x))
}

export { clamp, inverseLerp }