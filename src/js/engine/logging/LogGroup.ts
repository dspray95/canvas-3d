export class LogGroup{
    called: boolean = false;
    id: string;
    lastLogTime: number;
    createdAt: number;

    constructor(id: string){
        this.id = id;
        this.createdAt = Date.now();
        this.lastLogTime = 0;
    }

    log(message: string){
        this.called = true;
        const messageWithLogGroup = `[${this.id.toUpperCase()}] ${message}`;
        console.log(messageWithLogGroup)
        return messageWithLogGroup
    }

    logWithPause(message: string, pauseSeconds: number): string | null{
        /**useful to avoid spamming the console */
        const timeSinceLastLog =  (Date.now() - this.lastLogTime) / 1000;
        if (timeSinceLastLog >= pauseSeconds){
            this.lastLogTime = Date.now();
            return this.log(message)
        }
        return null
    }
}