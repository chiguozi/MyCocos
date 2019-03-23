import EventDispatcher from "./event/EventDispatcher";
import { Logger, LogLevel } from "./debug/Logger";
import FsmManager from "./fsm/FsmManager";
import HttpProxy from "./net/http/HttpProxy";
import ToolKit from "./tool/Toolkit";
import Setting from "./setting/Setting";

export default  class Global 
{
    public static Event:EventDispatcher;
    public static Logger:Logger;
    public static FsmManager:FsmManager;
    
    public static Http:HttpProxy;
    public static ToolKit:ToolKit;

    public static Setting:Setting;

    public static setup()
    {
        //全局事件管理器
        this.Event = new EventDispatcher();
        //三方库的使用 + 常用工具函数
        this.ToolKit = new ToolKit();

        this.Logger = new Logger;
        this.Logger.logLevel = LogLevel.All;
        this.Logger.logEnable = true;

        //fsm管理器
        this.FsmManager = new FsmManager();
        //http请求  主要负责common协议请求  和 get请求  业务逻辑走netmanager
        this.Http = new HttpProxy();
        //各类游戏配置  +  本地存储
        this.Setting = new Setting();

    }


    public static onUpdate()
    {
        this.FsmManager.onUpdate();
    }

    public static onLateUpdate()
    {
    }
}