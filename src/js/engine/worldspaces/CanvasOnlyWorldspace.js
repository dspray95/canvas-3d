import { Worldspace } from "./Worldspace";
import { kernelDynamicPerspectiveToScreenSpace } from "../rendering/gpu/ProjectionPipelineKernels";
import { render } from "../rendering/gpu/DrawKernels";
import { makeCuboid } from "../matrix-rendering/meshes/Mesh"
import { Color } from "../../tools/Colors";
import { CameraController } from "../../game/vaporwave-canyon/scripts/CameraController";

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
          new CameraController(this.camera, 10, 0.1)
      ]

      //initailize the bg color
      // // ctx.clearRect(0, 0, this.viewportWidth, this.viewportHeight);
      // ctx.globalAlpha = 1;
      // ctx.fillStyle = this.backgroundColor.toHtmlRgba()
      // ctx.fillRect(0, 0, this.viewportWidth, this.viewportHeight);
      this.canvasColor = Color.SPACEBLUE.toHtmlRgba()

      this.terrainColor = Color.PURPLE.copy()
      this.terrainColor.opacity = 0.6
      this.terrainColor = this.terrainColor.toHtmlRgba()
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
        //NB: STILL AT ~60FPS HERE, NOT THE SLOW BIT ^

        //Clear the canvas from last frame
        //This isn't optimal as some of the canvas may still be the same
        //Could clear the bottom of the canvas, where the terrain actually is
        ctx.fillStyle = this.canvasColor
        ctx.fillRect(0, 0, 1920, 1080)

        //Drawing the mesh planes for ONE terrrain object costs ~ 20FPS at the moment, pricey
        //This is partly due to drawing each tri individually
        //Could speed things up by drawing by row?
        //Drawing a wireframe is much faster ~ 5FPS or so, even with re-drawing tri edges
        let wireframe = new Path2D()
        ctx.fillStyle = this.terrainColor
        ctx.strokeStyle = Color.PINK.toHtmlRgba()

        let width = 20
        // for(let y = 0; y < 29; y++){
        //   let planeLower = new Path2D()
        //   let planeUpper = new Path2D()
        //   planeLower.moveTo(
        //     screenSpaceMatrices[y * width][0],
        //     screenSpaceMatrices[y * width][1]
        //   )
        //   planeUpper.moveTo(
        //     screenSpaceMatrices[(y + 1) * width - 1][0],
        //     screenSpaceMatrices[(y + 1) * width - 1][1]
        //   )
        //   for(let x = 0; x < width; x++){
        //     let lowerVertex = x + width * y
        //     //basically creating another line from the opposite direction as the lowerVertex
        //     let upperVertex = (width - 1 - x) + (width * (y + 1))
        //     if(doOnce){
        //       console.log(`x: ${x}`)
        //       console.log(`y: ${y}`)
        //       console.log(`UPPER: ${upperVertex}`)
        //       console.log(`LOWER: ${lowerVertex}`)

        //     }
        //     planeLower.lineTo(
        //       screenSpaceMatrices[lowerVertex][0],
        //       screenSpaceMatrices[lowerVertex][1]
        //     )
        //     try{
        //       planeUpper.lineTo(
        //         screenSpaceMatrices[upperVertex][0],
        //         screenSpaceMatrices[upperVertex][1]
        //       )
        //     }
        //     catch (TypeError){
        //         //Plane upper ends up here at the moment
        //     }
        //     if (x + width * y == 0){
        //       ctx.font = "30px Arial"
        //       ctx.fillStyle  = 'white'
        //       ctx.fillText(lowerVertex, screenSpaceMatrices[lowerVertex][0], screenSpaceMatrices[lowerVertex][1])
        //     }
        //   }
        //   // plane.closePath()

        //   let plane = new Path2D(planeLower)
        //   plane.addPath(planeUpper)
        //   // ctx.closePath(plane)
        //   ctx.fillStyle = this.terrainColor
        //   ctx.fill(plane)
        //   ctx.lineWidth = 1;
        //   ctx.stroke(plane)  
        //   doOnce = false

        // }
        this.objects.terrain[0].mesh.triangles.forEach(tri => {
          let plane = new Path2D()
          //Draw plane now
          plane.moveTo(
            screenSpaceMatrices[tri[0]][0],
            screenSpaceMatrices[tri[0]][1]
          )
          plane.lineTo(
            screenSpaceMatrices[tri[1]][0],
            screenSpaceMatrices[tri[1]][1]
          )
          plane.lineTo(
            screenSpaceMatrices[tri[2]][0],
            screenSpaceMatrices[tri[2]][1]
          )
          plane.lineTo(
            screenSpaceMatrices[tri[0]][0],
            screenSpaceMatrices[tri[0]][1]
          )
          // ctx.fill(plane) //~37fps filling this
          wireframe.addPath(plane)
        })
        // Think fill is getting confused here for some reason... to many edges/exclaves?
        ctx.fill(wireframe) //~47 fps filling this

        ctx.strokeStyle  = Color.PINK.toHtmlRgba()
        ctx.stroke(wireframe)

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