class Time{ 

    static deltaTime = 0
    static timeAtLastFrame = 0

    static update(){
        let currentTime = Math.floor(Date.now())
        this.deltaTime = currentTime - this.timeAtLastFrame
        this.timeAtLastFrame = currentTime
    }
}

export { Time }