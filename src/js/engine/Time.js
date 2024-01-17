class Time{ 

    static deltaTime = 1
    static timeAtLastFrame = Math.floor(Date.now()) / 1000

    static tick(){
        let currentTime = Math.floor(Date.now()) / 1000
        this.deltaTime = currentTime - this.timeAtLastFrame
        this.timeAtLastFrame = currentTime 
    }
}

export { Time }