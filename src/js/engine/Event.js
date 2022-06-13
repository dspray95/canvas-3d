class Event {

    constructor(callbacks=[]){
        this.callbacks = callbacks
    }

    checkTrigger(){ return }

    trigger(){
        this.callbacks.forEach(callback => {
            callback()
        })
    }
}

export { Event }