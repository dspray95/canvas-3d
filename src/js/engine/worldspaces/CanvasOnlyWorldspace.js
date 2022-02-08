import { Worldspace } from "./Worldspace";
import { kernelDynamicPerspectiveToScreenSpace } from "../rendering/gpu/ProjectionPipelineKernels";
import { render } from "../rendering/gpu/DrawKernels";
import { makeCuboid } from "../matrix-rendering/meshes/Mesh"

let doOnce = true


class CanvasOnlyWorldspace extends Worldspace {

    constructor(xLim, yLim, zLim, viewportWidth, viewportHeight, projectionMode) {
        super(xLim, yLim, zLim, viewportWidth, viewportHeight, projectionMode)
        
      this.objects['cubes'] = []
      // for(let i = 0; i <= 20; i++){
      this.objects['cubes'].push(
        makeCuboid([[0], [0], [100], [1]], 10, 10, 10)
      )
          // this.objects['cubes'].push(
          //     new Cuboid(
          //         new Vector(100, randomIntRange(-10, 10), i* 100),
          //         this,
          //         `cuboid ${i}`
          //     )
          // )
      // }

      this.scripts = [
          // new CameraController(this.camera)
      ]

      //this extracts out all our cubes so we don't have to constantly re-build the matrix list that we'll be operating with
      this.worldSpaceMatrices = []
      for(var objectGroup in this.objects){
        this.objects[objectGroup].forEach(object => {
          this.worldSpaceMatrices = this.worldSpaceMatrices.concat(object.points)
        })
      }
    }

    tick(ctx)
    {
        this.stats.begin()
        this.scripts.forEach(script => {
          script.execute()
        })
          
        //TODO Should be able to combine these kernels and still get the perspective space output...
        //Will be way faster than passing data cpu>gpu>cpugpu>cpu
        let perspectiveSpaceMatrices = this.camera.doMatrixPerspectivePointProjection(this.worldSpaceMatrices)
        let screenSpaceMatrices = kernelDynamicPerspectiveToScreenSpace(perspectiveSpaceMatrices, this.viewportWidth, this.viewportHeight)
        //NB: STILL AT ~60FPS HERE ^
        if(doOnce){
          console.log("TRI")
          console.log(this.objects.cubes[0].triangles)
          console.log("WSM")
          console.log(this.worldSpaceMatrices)
          console.log("PSM")
          console.log(perspectiveSpaceMatrices)
          console.log("SSM")
          console.log(screenSpaceMatrices)
          console.log("CTO")
          console.log(this.camera.cameraToOriginMatrix)
          console.log("PRS")
          console.log(this.camera.perspectiveMatrix)
          doOnce = false;
        }
        ctx.strokeStyle  = `rgb(255,255,255)`

        this.objects.cubes[0].triangles.forEach(tri => {
          ctx.beginPath()
          ctx.moveTo(
            screenSpaceMatrices[tri[0]][0],
            screenSpaceMatrices[tri[0]][1]
          )
          ctx.lineTo(
            screenSpaceMatrices[tri[1]][0],
            screenSpaceMatrices[tri[1]][1]
          )
          ctx.lineTo(
            screenSpaceMatrices[tri[2]][0],
            screenSpaceMatrices[tri[2]][1]
          )
          ctx.lineTo(
            screenSpaceMatrices[tri[0]][0],
            screenSpaceMatrices[tri[0]][1]
          )
          ctx.stroke()
          ctx.closePath()
        })
        // for(let i = 0; i < this.objects['cubes'].length; i++){
        //   for(let tri = 0; tri < this.objects['cubes'][i].triangles.length; tri++){

        //     ctx.beginPath()

        //     ctx.moveTo(
        //       screenSpaceMatrices[4][0], 
        //       screenSpaceMatrices[4][1]
        //     )
        //     ctx.lineTo(
        //       screenSpaceMatrices[5][0], 
        //       screenSpaceMatrices[5][1]
        //     )
        //     ctx.lineTo(
        //       screenSpaceMatrices[6][0], 
        //       screenSpaceMatrices[6][1]
        //     )
        //     ctx.lineTo(
        //       screenSpaceMatrices[4][0], 
        //       screenSpaceMatrices[4][1]
        //     )
        //     ctx.stroke()
        //     ctx.closePath()
        //   }
        // }
        this.camera.tick()
    
        this.lightSources.forEach((lightSource) => {
          lightSource.tick();
        })
    
        this.ui.forEach((element) => { //<<Drawing all these seems to have a negligable fps impact (~1fps at most)
          element.draw(ctx)            //BUT we should still break out these draws onto a separate canvas that lives on top of the game-world one
        })                             //to save on useless updating and CPU ops
        this.stats.end()
    }
}


export { CanvasOnlyWorldspace }