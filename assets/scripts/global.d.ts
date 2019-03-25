import EventDispatcher from "./framework/event/EventDispatcher";
import FsmManager from "./framework/fsm/FsmManager";
import HttpProxy from "./framework/net/http/HttpProxy";
import ToolKit from "./framework/tool/Toolkit";
import Setting from "./framework/setting/Setting";

declare global {
    declare class Global {
        static Event:EventDispatcher;
        static FsmManager:FsmManager;
        static Http:HttpProxy;
        static Toolkit:ToolKit;
        static Setting:Setting;
    
        static setup();
    
        static onUpdate();
    
        static onLateUpdate();
    
    }
    
    
    declare enum LogLevel
    {
        None = 0,
        Log = 0x01,
        Warn = 0x02,
        Info = 0x04,
        Error = 0x08,
        All = 0xff,
    }
    
    declare class Logger
    {
        static logLevel:LogLevel;
        static logEnable:boolean;
    
        static logObj(obj, ...args);
        static log(...args);
        static warn(...args);
        static error(...args);
    }
}

