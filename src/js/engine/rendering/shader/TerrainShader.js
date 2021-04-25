import { Color } from "../../../tools/Colors"
import { MeshDefaults } from "../objects/mesh/MeshDefaults"

class TerrainShader{

  static draw(camera, canvas, triangles, lightSources, drawFaces, drawWireframe, opacityModifier, drawCalls){
    let y = 45

    for(let i = 0; i<triangles.length; i++){
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

      let color = triangles[i].color
      color.opacity = opacityModifier * 0.5

      if(i >= y - 3 && y >= + 2){
        if(i == y + 2){
          y += 45
        }
        // continue
        color = Color.PINK
      }
      

      if (i >= y-20 && i <= y+2){
        // color = Color.WHITE
      }


      let faceCullA = triA.normal.dotProduct(triA.calculatePlaneCenter().getVectorTo(camera.location)) <= 0 ? true : false
      // let faceCullB = triB.normal.dotProduct(triB.calculatePlaneCenter().getVectorTo(camera.location)) <= 0 ? true : false
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
          // canvas.lineTo(triB.C.screenSpaceX, triB.C.screenSpaceY)
          // canvas.moveTo(triA.A.screenSpaceX, triA.A.screenSpaceY)
          canvas.closePath()

          canvas.fillStyle = color.toHtmlRgba()
          canvas.fill()       
          let pink = Color.PINK.copy()
          pink.opacity = pink.opacity * opacityModifier
          canvas.strokeStyle = pink.toHtmlRgba();
          canvas.lineWidth = 1;
          canvas.stroke()
        }
      }
    }
  }
}


export { TerrainShader }