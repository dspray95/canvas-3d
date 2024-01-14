import { Logger } from "../../logging/logger";

const logger = Logger.logger;

export class Collision{

    static pointCollides2D(
        pointX: number,
        pointY: number,
        lowerXBound: number,
        upperXBound: number,
        lowerYBound: number,
        upperYBound: number
    ){
        const xIntersects: boolean = pointX >= lowerXBound && pointX <= upperXBound
        const yIntersects: boolean = pointY >= lowerYBound && pointY <= upperYBound
        
        // logger.log(`checking collision: \n
        //     x: ${pointX}, y: ${pointY},\n
        //     lower x: ${lowerXBound}, upper x: ${upperXBound}, \n
        //     lower y: ${lowerYBound}, upper y: ${upperYBound}
        // `)

        if(xIntersects && yIntersects){
            return true;
        }
        return false;
    }
}