import { Color } from "../../../tools/Colors"
import { MeshDefaults } from "../objects/mesh/MeshDefaults"

let doOnce = true
class TerrainShader{

  static drawVertLabels(canvas, vertices, mapWidth, terrainName, terrainColor){
    canvas.fillStyle = "white"
    canvas.font = "10px Arial"
    for(let i = 0; i < mapWidth; i++){
        canvas.fillText(i, vertices[i].screenSpaceX, vertices[i].screenSpaceY)
    }
    for(let i = vertices.length - mapWidth; i < vertices.length; i++){
      canvas.fillText(i, vertices[i].screenSpaceX, vertices[i].screenSpaceY)
    }
    canvas.fillStyle = terrainColor
    canvas.font = "40px Arial"
    let centerVert = vertices[Math.floor(vertices.length/2)]
    canvas.fillText(terrainName, centerVert.screenSpaceX, centerVert.screenSpaceY)
  }

  static showTerrainObjectLabels(canvas, terrain){

    canvas.fillText()
  } 

  static draw(camera, canvas, triangles, lightSources, drawFaces, drawWireframe, opacityModifier, drawCalls, mapWidth, mapHeight){
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
          canvas.stroke()
          // if (i == triangles.length - 20){
          //   canvas.fillStyle = "white"
          //   canvas.font = "30px Arial"
          //   canvas.fillText("A", triA.A.screenSpaceX, triA.A.screenSpaceY)
          //   canvas.fillText("B", triA.B.screenSpaceX, triA.B.screenSpaceY)
          //   canvas.fillText("C", triA.C.screenSpaceX, triA.C.screenSpaceY)

          // }
        }
      }
    }
    doOnce = false
  }
}


export { TerrainShader }