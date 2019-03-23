export enum LogLevel
{
    None = 0,
    Log = 0x01,
    Warn = 0x02,
    Info = 0x04,
    Error = 0x08,
    All = 0xff,
}

export class Logger 
{
    public logLevel:LogLevel = LogLevel.All;
    public logEnable = true;

    public logObj(obj, ...args)
    {
        let logger = console.log || cc.log;
        if(this.logEnable && this.logLevel & LogLevel.Log)
        {
            logger.call(this, this.getLogContent(args), obj);
        }
    }

    public log(...args)
    {
        let logger = console.log || cc.log;
        if(this.logEnable && this.logLevel & LogLevel.Log)
        {
            logger.call(this, this.getLogContent(args));
        }
    }

    public warn(...args)
    {
        let logger = console.warn || cc.warn;
        if(this.logEnable && this.logLevel & LogLevel.Warn)
        {
            logger.call(this, this.getLogContent(args));
        }
    }

    public error(...args)
    {
        let logger = console.error || cc.error;
        if(this.logEnable && this.logLevel & LogLevel.Error)
        {
            logger.call(this, this.getLogContent(args));
        }
    }

    private getLogContent(args)
    {
        let content =  this.getDateStr()  + args.join("\t"); 
        return content;
    }

    private getDateStr()
    {
        var d = new Date();
        var str = d.getHours().toString();
        var timeStr = "";
        timeStr += (str.length==1? "0"+str : str) + ":";
        str = d.getMinutes().toString();
        timeStr += (str.length==1? "0"+str : str) + ":";
        str = d.getSeconds().toString();
        timeStr += (str.length==1? "0"+str : str) + ":";
        str = d.getMilliseconds().toString();
        if( str.length==1 ) str = "00"+str;
        if( str.length==2 ) str = "0"+str;
        timeStr += str;
    
        timeStr = "[" + timeStr + "]";
        return timeStr;
    }
}