class Color{

  static GREEN = new Color(64, 163, 90)
  static LIGHT_GREEN =  new Color(64, 180, 90)
  static BLUE = new Color(64, 163, 160)
  static LIGHTBLUE = new Color(64, 183, 162)
  static DARKBLUE = new Color(64, 74, 163)
  static PURPLE =  new Color(112, 64, 163)
  static LIGHTPURPLE = new Color(121, 64, 173)
  static MAGENTA = new Color(163, 64, 115)
  static RED = new Color(163, 64, 64)
  static LIGHTRED = new Color(183, 64, 64)
  static SPACEBLUE = new Color(30, 33, 49)
  static YELLOW = new Color(247, 237, 171)
  static LIGHTYELLOW = new Color(250, 240, 170)
  static PINK =  new Color(236, 95, 255)
  static GREY = new Color(166, 166, 166)
  static LIGHTGREY = new Color(188, 188, 188)
  static DARKGREY = new Color(122, 122, 122)
  static WHITE = new Color(255, 255, 255)
  static BLACK = new Color(0, 0, 0)

  constructor(R, G, B, opacity=1){
    this.R = R
    this.G = G
    this.B = B
    this.opacity = opacity
  }

  copy(){
    return new Color(
      this.R,
      this.G,
      this.B,
      this.opacity
    )
  }

  multiply(val){
    return new Color(
      this.R * val,
      this.G * val,
      this.B * val,
      this.opacity
    )
  }

  asList(){
    return [this.R, this.G, this.B, this.opacity]
  }

  toHtmlRgba(){
    return `rgba(${this.asList()})`
  }

  static random(opacity=1){
    let R = Math.round(255 * Math.random())
    let G = Math.round(255 * Math.random())
    let B = Math.round(255 * Math.random())
    return new Color(R, G, B, opacity)
  }

  static getRandomBuiltin(){
    const keys = Object.keys(Color.DEFAULTS);
    let idx = Math.round((keys.length - 1) * Math.random())
    let key = keys[idx]
    let color = Color.DEFAULTS[key];
    // let color = Color.DEFAULTS[keys[Math.round(keys.length * Math.random())]];
    if (color === undefined){
      console.log(keys)
      console.log(idx)
      console.log(key)
      console.log(color)
    }
    return color
  }

}

export { Color }