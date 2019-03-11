import EventDispatcher from "./event/EventDispatcher";
import { Logger, LogLevel } from "./debug/Logger";

export default  class Global 
{
    public static Event:EventDispatcher;
    public static Logger:Logger;

    public static setup()
    {
        this.Event = new EventDispatcher();
        this.Logger = new Logger;
        this.Logger.logLevel = LogLevel.All;
    }
}