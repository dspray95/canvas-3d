import { Shader } from "../../../engine/rendering/shader/Shader";
import { Color } from "../../../tools/Colors"
class TerrainShader extends Shader{

  static draw(camera, canvas, triangles, drawCalls){
    canvas.lineWidth = 1;
    for(let i = 0; i < triangles.length; i++){
      let triA = triangles[i]
      if(triA.A.drawCalls <= drawCalls){
        camera.perspectivePointProjectionPipeline(triA.A)
        triA.A.drawCalls++
      }
      if(triA.B.drawCalls <= drawCalls){
        camera.perspectivePointProjectionPipeline(triA.B)
        triA.B.drawCalls++
      }
      if(triA.C.drawCalls <= drawCalls){
        camera.perspectivePointProjectionPipeline(triA.C)
        triA.C.drawCalls++
      }


      let faceCullA = triA.normal.dotProduct(triA.calculatePlaneCenter().getVectorTo(camera.location)) <= 0 ? true : false
      let clipResultsAB = camera.clipLine(triA.A.inPerspectiveSpace, triA.B.inPerspectiveSpace)
      let clipResultsBC = camera.clipLine(triA.B.inPerspectiveSpace, triA.C.inPerspectiveSpace)

      if(!faceCullA){
        if(clipResultsAB.showLine || clipResultsBC.showLine){

          canvas.beginPath()
          if(clipResultsAB.showLine){
            canvas.moveTo(triA.A.screenSpaceX, triA.A.screenSpaceY)
            canvas.lineTo(triA.B.screenSpaceX, triA.B.screenSpaceY)
          } else {
            canvas.moveTo(triA.B.screenSpaceX, triA.B.screenSpaceY)
          }
          if(clipResultsBC.showLine){
            canvas.lineTo(triA.C.screenSpaceX, triA.C.screenSpaceY)
          }
          canvas.closePath()

          canvas.fillStyle = triA.fillColor
          canvas.fill()    

          canvas.strokeStyle = triA.wireframeColor
          // canvas.strokeStyle = Color.WHITE.toHtmlRgba()
          canvas.stroke()
        }
      }
    }
  }
}


export { TerrainShader }