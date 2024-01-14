class Time{ 

    static deltaTime = 0
    static timeAtLastFrame = 0

    static tick(){
        let currentTime = Math.floor(Date.now()) / 1000
        this.deltaTime = currentTime - this.timeAtLastFrame
        this.timeAtLastFrame = currentTime 
    }
}

export { Time }