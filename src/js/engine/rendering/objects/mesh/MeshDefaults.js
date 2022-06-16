
import { Color } from "../../../../tools/Colors"

class MeshDefaults{
  //Rendering
  static drawWireframe = false
  static drawVertices = true
  static drawVerticeNumbers = false
  static drawTriangleCentrepoints = false
  static drawSurfaceNormals = false

  //Colors
  static verticeColor = Color.YELLOW
  static faceCentrePointColor = Color.PINK
  static wireframeColor = Color.BLUE
  static planeColor = Color.WHITE
  static globalIllumination = 0.01
}

export {MeshDefaults}