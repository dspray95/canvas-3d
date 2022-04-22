import { GPU } from 'gpu.js';

export class gpuInterface{

    static gpu = null;

    static getGPU() {
       if(gpuInterface.gpu === null){
        gpuInterface.gpu = new GPU()
       } 
       return gpuInterface.gpu
    }
}