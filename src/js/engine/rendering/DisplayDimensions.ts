import { DisplayMode } from "./DisplayMode";

const ultrawide_ratio = 2.333;

class DisplayDimensions{

    width: number;
    height: number;
    
    constructor(width: number, height: number){
        this.width = width;
        this.height = height;
    }

    getDisplayMode(): DisplayMode{
        if(this.width < this.height){
            return DisplayMode.VERTICAL;
        } else if(this.width/this.height >= ultrawide_ratio){
            return DisplayMode.ULTRAWIDE;
        } else {
            return DisplayMode.STANDARD;
        }
    }
}

export { DisplayDimensions }