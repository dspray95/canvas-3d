class Time{ 

    static deltaTime: number = 1
    static timeAtLastFrame: number = this.nowAsSeconds()

    static updateTimeAtLastFrame(): void{
        this.timeAtLastFrame = this.nowAsSeconds()
    }

    static tick(): void{
        let currentTime = this.nowAsSeconds()
        this.deltaTime = currentTime - this.timeAtLastFrame
        this.timeAtLastFrame = currentTime 
    }

    private static nowAsSeconds(): number {
        return Math.floor(Date.now()) / 1000
    }
}

export { Time }