import Triangle from "../../rendering/rendering-objects/primitives/Triangle";
import WorldObject from "../../objects/WorldObject"
import { Vector } from "../../rendering/rendering-objects/primitives/Vector"
import { MeshDefaults } from "../../rendering/rendering-objects/mesh/MeshDefaults";
import Point, { averagePoint } from "../../rendering/rendering-objects/primitives/Point";
import { Color } from "../../../tools/Colors"
import { randomRange } from "../../../tools/Random";
import { FlatShading } from "../../rendering/shader/FlatShading";
import { Matrix } from "../Matrix";

/**
 * This differs from the other Mesh class by having super basic matrix-based
 * definitions of points and tris instead of object based definitions
 * The 'BasicMesh' is basically just a holder for the two lists of matrices that form a mesh
 */
class BasicMesh{

  constructor(origin, points, triangles){
    this.origin = origin
    this.points = []
    points.forEach(point => {
      this.points.push([
        [point[0]],
        [point[1]],
        [point[2]],
        [1]
      ])
    })
    this.translate(this.origin[0][0], this.origin[1][0], this.origin[2][0])
    this.triangles = triangles
  }

  rotate(axis, angleDegrees){
    //To rotate the points
    //1. Move to world origin (i.e subtract parent location)
    //2. Do matrix rotation operation
    //3. Move back to relative location (i.e Add parent location)
    //Do this for every point
    this.points.forEach((point) => {
      point = Matrix.translate(point, -this.origin[0][0], -this.origin[1][0], -this.origin[2][0])
      point = Matrix.rotate(point, axis, angleDegrees * (Math.PI / 180)) //Gotta convert degress to radians because matrices
      point = Matrix.translate(point, this.origin[0][0], this.origin[1][0], this.origin[2][0])
    })
  }

  translate(x, y, z){
    let translatedPoints = []
    this.points.forEach((point) => {
      translatedPoints.push(Matrix.translate(point, x, y, z))
    })
    this.points = translatedPoints
  }

  scale(x, y, z){
    //TODO
  }
}

const makeCuboid = (origin, cuboidWidth, cuboidHeight, cuboidLength) => {
  let xOffset = cuboidWidth * 0.5
  let yOffset = cuboidHeight * 0.5
  let zOffset = cuboidLength * 0.5

  let botLeft = [-xOffset, -yOffset, -zOffset, 1]
  let botRight = [xOffset, -yOffset, -zOffset, 1]
  let botLeftBack = [-xOffset, -yOffset, zOffset, 1]
  let botRightBack = [xOffset, -yOffset, zOffset, 1]
  let topLeft = [-xOffset, yOffset, -zOffset, 1]
  let topRight = [xOffset, yOffset, -zOffset, 1]
  let topLeftBack = [-xOffset, yOffset, zOffset, 1]
  let topRightBack = [xOffset, yOffset, zOffset, 1]

  let points = [
    topLeft,
    topRight,
    topRightBack,
    topLeftBack,
    botLeft,
    botRight,
    botRightBack,
    botLeftBack,
  ];

  let triangles = [
    //Bottom
    [1, 0, 2],
    [0, 3, 2],
    //Front
    [0, 1, 4],
    [1, 5, 4],
    //Right
    [1, 2, 6],
    [1, 6, 5],
    //Left
    [0, 7, 3],
    [0, 4, 7],
    //Top
    [4, 5, 6],
    [4, 6, 7],
    //Back
    [2, 3, 7],
    [2, 7, 6]
  ]

  return new BasicMesh(origin, points, triangles)
}

export { BasicMesh, makeCuboid }


