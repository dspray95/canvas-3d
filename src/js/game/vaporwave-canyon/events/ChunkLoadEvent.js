import { Event } from "../../../engine/Event";

class ChunkLoad extends Event{

    constructor(...callbacks){
        super(callbacks)
    }

}

export { ChunkLoad }