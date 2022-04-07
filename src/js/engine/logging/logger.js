class Logger{

    static _logger = null
    static logger = Logger._getLogger()

    constructor(){
        this.logGroups = {
            "default": {}
        }
        this.calledOnce = false
    }

    static _getLogger(){
        if (Logger._logger != null){
            return Logger._logger
        } else {
            Logger._logger = new Logger()
            return Logger._logger
        }
    }

    static logOnce(message, logGroup="default"){
        const logger = Logger._getLogger()
        logger._checkLogGroup(logGroup)
        // console.log(logger.logGroups)
        if(!logger.logGroups[logGroup].called){
            console.log(`[${logGroup.toUpperCase()}] ${message}`)
        }
    }

    _checkLogGroup(logGroup){
        if(!(logGroup in this.logGroups)){
            this.logGroups[logGroup] = {
                "called": false
            }
        }
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