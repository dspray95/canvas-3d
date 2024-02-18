import { DisplayMode } from "./DisplayMode";

const ULTRAWIDE_RATIO = 2.333;

class DisplayDimensions{

    width: number;
    height: number;
    
    constructor(width: number, height: number){
        this.width = width;
        this.height = height;
    }

    getDisplayMode(): DisplayMode{
        return DisplayDimensions.getDisplayMode(this.width, this.height);
    }

    static getDisplayMode(width: number, height: number): DisplayMode{
        if(width < height){
            return DisplayMode.VERTICAL;
        } else if(width/height >= ULTRAWIDE_RATIO){
            return DisplayMode.ULTRAWIDE;
        } else {
            return DisplayMode.STANDARD;
        }
    }
}

export { DisplayDimensions }