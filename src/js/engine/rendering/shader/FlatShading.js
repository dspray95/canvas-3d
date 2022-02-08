import { Color } from "../../../tools/Colors"
import { MeshDefaults } from "../rendering-objects/mesh/MeshDefaults"

class FlatShading{

  static draw(camera, canvas, triangles, lightSources, drawFaces, drawWireframe){
    triangles.forEach(triangle => {
      
      let faceCull = triangle.normal.dotProduct(triangle.calculatePlaneCenter().getVectorTo(camera.location)) <= 0 ? true : false
      if(!faceCull){
        
        let clipResultsAB = camera.clipLine(triangle.A.inPerspectiveSpace, triangle.B.inPerspectiveSpace)
        let clipResultsBC = camera.clipLine(triangle.B.inPerspectiveSpace, triangle.C.inPerspectiveSpace)

        canvas.beginPath()
        if(clipResultsAB.showLine){
          canvas.moveTo(triangle.A.screenSpaceX, triangle.A.screenSpaceY)
          canvas.lineTo(triangle.B.screenSpaceX, triangle.B.screenSpaceY)
        }
        else{
          canvas.moveTo(triangle.B.screenSpaceX, triangle.B.screenSpaceY)
        }
        if(clipResultsBC.showLine){
          canvas.lineTo(triangle.C.screenSpaceX, triangle.C.screenSpaceY)
        }
        canvas.closePath()
        
        //Color!
        // for B val 
        // bLit = b(ambient.b + diffuse.b * (n dot l)) + lightSource.b * specular.b(n dot c)^m
        // Where 
        //  n = plane normal vector
        //  l = vector from plane centre point and light source location
        //  c = vector from plane centre point to camera location
        //  m = falloff for specularity (constant)
        if(clipResultsAB.showLine || clipResultsBC.showLine){
          if (drawFaces){
            // let lightSource = lightSources[0]
            // let diffuse = 0.1
            // let specularity = 0.01
            // let planeToLightSourceVector = triangle.planeCentre.getVectorTo(lightSource.location).unitLengthVector()
            // let planeToCameraVector = triangle.planeCentre.getVectorTo(camera.location).unitLengthVector()
            
            // let rLit = triangle.color.R * (MeshDefaults.globalIllumination + diffuse * triangle.normal.dotProduct(planeToLightSourceVector)) + lightSource.color.R * (specularity * planeToLightSourceVector.dotProduct(planeToCameraVector))
            // let gLit = triangle.color.G * (MeshDefaults.globalIllumination + diffuse * triangle.normal.dotProduct(planeToLightSourceVector)) + lightSource.color.G * (specularity * planeToLightSourceVector.dotProduct(planeToCameraVector))
            // let bLit = triangle.color.B * (MeshDefaults.globalIllumination + diffuse * triangle.normal.dotProduct(planeToLightSourceVector)) + lightSource.color.B * (specularity * planeToLightSourceVector.dotProduct(planeToCameraVector))
            // let colorLit = new Color(rLit, gLit, bLit, 1).toHtmlRgba()
            // canvas.fillStyle = colorLit
            canvas.fillStyle = triangle.color.toHtmlRgba()
            canvas.fill()
            // canvas.strokeStyle = colorLit
            // canvas.lineWidth = 1;
            // canvas.stroke()
          }
          if(drawWireframe){
            canvas.strokeStyle = Color.PINK.toHtmlRgba();
            canvas.lineWidth = 1;
            canvas.stroke()
          }
        }
      }
    })
  }
}


export { FlatShading }