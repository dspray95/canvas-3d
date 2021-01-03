const colors = {
  green: [64, 163, 90],
  blue: [64, 163, 160],
  darkBlue: [64, 74, 163],
  purple: [112, 64, 163],
  magenta: [163, 64, 115],
  red: [163, 64, 64],
  spaceBlue: [30, 33, 49],
  yellow: [247, 237, 171],
  pink: [236, 95, 255]
};

function RandomColor() {
  const keys = Object.keys(colors);
  return colors[keys[Math.round(keys.length * Math.random())]];
}

function RGBA(color) {
  return `rgba(${color})`;
}

export { colors, RandomColor, RGBA };
