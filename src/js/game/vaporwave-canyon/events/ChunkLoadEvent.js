import { Event } from "../../../engine/Event";

class ChunkLoad extends Event{

    constructor(cameraPos, chunkSize, callbacks=[]){
        super(callbacks)
        this.cameraPos = cameraPos
        this.chunkSize = chunkSize
        this.lastChunkZ = chunkSize * 0.5
        this.canLoadChunk = true
    }

}

export { ChunkLoad }