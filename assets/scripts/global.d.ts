import EventDispatcher from "./framework/event/EventDispatcher";
import FsmManager from "./framework/fsm/FsmManager";
import HttpProxy from "./framework/net/http/HttpProxy";
import Toolkit from "./framework/tool/Toolkit";
import Setting from "./framework/setting/Setting";
import HallNet from "./logic/core/net/hall/HallNet";
import ResourceManager from "./framework/resource/ResourceManager";

declare global {
    declare class Global {
        static Event:EventDispatcher;
        static FsmManager:FsmManager;
        static Http:HttpProxy;
        static HallNet:HallNet;
        static Toolkit:Toolkit;
        static Setting:Setting;
        static ResourceManager:ResourceManager;
    
        static setup();
    
        static onUpdate();
    
        static onLateUpdate();
    
    }
    
    
    declare enum LogLevel
    {
        None = 0,
        Log = 0x01,
        Warn = 0x02,
        Net = 0x04,
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

