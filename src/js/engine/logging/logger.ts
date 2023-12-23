import { PassThrough } from "stream";
import { LogGroup } from "./LogGroup";

const DEFAULT_LOG_GROUP_ID: string = "DEFAULT"

class Logger{

    static _logger: Logger;
    static logger = Logger.getLogger();
    logGroups: Array<LogGroup>;
    calledOnce: boolean;
    lastLogTime: number;

    constructor(){
        this.logGroups = [
            new LogGroup(DEFAULT_LOG_GROUP_ID)
        ]
        this.calledOnce = false
        this.lastLogTime = Date.now();
    }

    private static getLogger(){
        if (Logger._logger != null){
            return Logger._logger
        } else {
            Logger._logger = new Logger()
            return Logger._logger
        }
    }

    log(message: string, logGroupId: string=DEFAULT_LOG_GROUP_ID){
        const logGroup = this.getLogGroup(logGroupId);
        return logGroup.log(message);
    }

    logOnce(message: string, logGroupId: string=DEFAULT_LOG_GROUP_ID){
        const logGroup = this.getLogGroup(logGroupId);
        if(!logGroup.called){
            console.log(`[${logGroup.id}] ${message}`)
        }
    }

    private getLogGroup(logGroupId: string): LogGroup{ 
        /** Will create a log group with the given ID if non exists */
        let logGroup = this.logGroups.find(logGroup => logGroup.id == logGroupId);
        if (!logGroup){
            logGroup = new LogGroup(logGroupId);
            this.logGroups.push(logGroup);
        }
        return logGroup;
    }

    logWithPause(message: string, pauseSeconds: number=1, logGroupId: string=DEFAULT_LOG_GROUP_ID){
        const logGroup = this.getLogGroup(logGroupId);
        logGroup.logWithPause(message, pauseSeconds);
    }  

    private addLogGroup(newLogGroupId: string){
        this.logGroups.forEach(logGroup => {
            if(logGroup.id = newLogGroupId){
                throw new Error(`Log group ${newLogGroupId}`)
            }
        })
    }

    tick(){
        if(!this.calledOnce){
            for(const [groupName, logGroup] of Object.entries(this.logGroups))
            {
                logGroup.called = true
            }
            this.calledOnce = true
        }
    }
}

export { Logger }