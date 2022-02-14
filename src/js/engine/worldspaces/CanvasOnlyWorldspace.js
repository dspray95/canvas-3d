import { Worldspace } from "./Worldspace";
import { kernelDynamicPerspectiveToScreenSpace } from "../rendering/gpu/ProjectionPipelineKernels";
import { render } from "../rendering/gpu/DrawKernels";
import { makeCuboid } from "../matrix-rendering/meshes/Mesh"

let doOnce = true


class CanvasOnlyWorldspace extends Worldspace {

    constructor(xLim, yLim, zLim, viewportWidth, viewportHeight, projectionMode, ctx) {
        super(xLim, yLim, zLim, viewportWidth, viewportHeight, projectionMode)
        
      // this.objects['cubes'] = []
      // for(let i = 0; i <= 20; i++){
      // this.objects['cubes'].push(
      //   makeCuboid([[0], [0], [100], [1]], 10, 10, 10)
      // )
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

      //initailize the bg color
      // // ctx.clearRect(0, 0, this.viewportWidth, this.viewportHeight);
      // ctx.globalAlpha = 1;
      // ctx.fillStyle = this.backgroundColor.toHtmlRgba()
      // ctx.fillRect(0, 0, this.viewportWidth, this.viewportHeight);
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
        // - At around 47FPS with a matrix output length size of 1500
        if(doOnce){
          console.log("RPM")
          console.log(this.worldSpaceMatrices)
          console.log("PSM")
          console.log(perspectiveSpaceMatrices)
          console.log("SSM")
          console.log(screenSpaceMatrices)
          console.log("N Points")
          console.log(this.objects.terrain[0].mesh.points.length)
          console.log("Mesh points")
          console.log(this.objects.terrain[0].mesh.points)
        }


        ctx.strokeStyle  = `rgb(255,255,255)`
        ctx.beginPath()
        this.objects.terrain[0].mesh.triangles.forEach(tri => {
          if(doOnce){
            // console.log(tri)
            // console.log(screenSpaceMatrices[tri[0]][0], screenSpaceMatrices[tri[0]][1])
          }
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
        })
        ctx.stroke()
        ctx.closePath()

        this.camera.tick()
    
        this.lightSources.forEach((lightSource) => {
          lightSource.tick();
        })
    
        this.ui.forEach((element) => { //<<Drawing all these seems to have a negligable fps impact (~1fps at most)
          element.draw(ctx)            //BUT we should still break out these draws onto a separate canvas that lives on top of the game-world one
        })                             //to save on useless updating and CPU ops
        this.stats.end()
        doOnce = false
    }
}


export { CanvasOnlyWorldspace }