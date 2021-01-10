import { dot } from "./Matrix";

function TranslationMatrix3D(a, b, c) {
  return [
    [1, 0, 0, a],
    [0, 1, 0, b],
    [0, 0, 1, c],
    [0, 0, 0, 1],
  ];
}

function ScaleMatrix3D(a, b, c) {
  return [
    [a, 0, 0, 0],
    [0, b, 0, 0],
    [0, 0, c, 0],
    [0, 0, 0, 1],
  ];
}

function RigidbodyMatrix(T, R) {
  return dot(T, R);
}

function VectorRotationMatrix3D(axis, angle){
  if (axis == "x") {
    return [
      [1, 0, 0],
      [0, Math.cos(angle), -Math.sin(angle)],
      [0, Math.sin(angle), Math.cos(angle)],
    ];
  }
  if (axis == "y") {
    return [
      [Math.cos(angle), 0, Math.sin(angle)],
      [0, 1, 0],
      [-Math.sin(angle), 0, Math.cos(angle)]
    ];
  }
  if (axis == "z") {
    return [
      [Math.cos(angle), -Math.sin(angle), 0],
      [Math.sin(angle), Math.cos(angle), 0],
      [0, 0, 1]
    ];
  }
  else{
    throw "Invalid rotation axis!"
  }
}

/**
 * 
 * @param {*} axis one of ("x", "y", "z")
 * @param {*} angle Angle in RADIANS
 */
function RotationMatrix3D(axis, angle) {
  
  if (axis == "x") {
    return [
      [1, 0, 0, 0],
      [0, Math.cos(angle), -Math.sin(angle), 0],
      [0, Math.sin(angle), Math.cos(angle), 0],
      [0, 0, 0, 1],
    ];
  }
  if (axis == "y") {
    return [[Math.cos(angle), 0, Math.sin(angle), 0],
    [0, 1, 0, 0],
    [-Math.sin(angle), 0, Math.cos(angle), 0],
    [0, 0, 0, 1],
  ];
  }
  if (axis == "z") {
    return [
      [Math.cos(angle), -Math.sin(angle), 0, 0],
      [Math.sin(angle), Math.cos(angle), 0, 0],
      [0, 0, 1, 0],
      [0, 0, 0, 1],
    ];
  }
  else{
    throw "Invalid Rotation Axis!"
  }
}

export { RotationMatrix3D, TranslationMatrix3D, ScaleMatrix3D, VectorRotationMatrix3D };
