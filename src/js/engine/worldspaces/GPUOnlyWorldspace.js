import { Worldspace } from "./Worldspace";
import { kernelDynamicPerspectiveToScreenSpace } from "../rendering/gpu/ProjectionPipelineKernels";
import { render } from "../rendering/gpu/DrawKernels";

let doOnce = true


class GPUOnlyWorldspace extends Worldspace {

    constructor(xLim, yLim, zLim, viewportWidth, viewportHeight, projectionMode) {
        super(xLim, yLim, zLim, viewportWidth, viewportHeight, projectionMode)
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
    
        render()
        if (doOnce) {
          console.log(render.getPixels())
          console.log(render.canvas)
          console.log(render)
          doOnce = false
        }
        let data = new ImageData(render.getPixels(), 1920, 1080)
        ctx.putImageData(data, 0, 0)
    
        // let nPointsTraversed = 0
        // for(var objectGroup in this.objects){
        //   this.objects[objectGroup].forEach(object => {
        //     object.mesh.points.forEach(point => {
        //       point.inPerspectiveSpace.setMatrixFromList(perspectiveSpaceMatrices[nPointsTraversed])
        //       point.screenSpaceX = screenSpaceMatrices[nPointsTraversed][0]
        //       point.screenSpaceY = screenSpaceMatrices[nPointsTraversed][1]
        //       nPointsTraversed++
        //     })
        //     object.mesh.drawPerspective(ctx, this.camera)
        //   })
        // }
    
        this.camera.tick()
    
        this.lightSources.forEach((lightSource) => {
          lightSource.tick();
        })
    
        this.ui.forEach((element) => {
          element.draw(ctx)
        })
        this.stats.end()
    }
}


export { GPUOnlyWorldspace }