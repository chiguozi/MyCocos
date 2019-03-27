import EventDispatcher from "../../framework/event/EventDispatcher";
import { Logger, LogLevel } from "../../framework/debug/Logger";
import FsmManager from "../../framework/fsm/FsmManager";
import HttpProxy from "../../framework/net/http/HttpProxy";
import Toolkit from "../../framework/tool/Toolkit";
import Setting from "../../framework/setting/Setting";
import HallNet from "./net/hall/HallNet";
import ResourceManager from "../../framework/resource/ResourceManager";

export default  class Global 
{
    public static Event:EventDispatcher;
    public static FsmManager:FsmManager;
    
    public static Http:HttpProxy;
    public static HallNet:HallNet;


    public static Toolkit:Toolkit;
    public static Setting:Setting;

    public static ResourceManager:ResourceManager;


    public static setup()
    {
        //全局事件管理器
        this.Event = new EventDispatcher();
        //三方库的使用 + 常用工具函数
        this.Toolkit = new Toolkit();

        Logger.logLevel = LogLevel.All;
        Logger.logEnable = true;

        //fsm管理器
        this.FsmManager = new FsmManager();
        //http请求  主要负责common协议请求  和 get请求  业务逻辑走netmanager
        this.Http = new HttpProxy();
        //大厅协议通信
        this.HallNet = new HallNet();

        //各类游戏配置  +  本地存储
        this.Setting = new Setting();
        //资源管理器  资源加载  释放   依赖管理
        this.ResourceManager = new ResourceManager();

    }


    public static onUpdate()
    {
        this.FsmManager.onUpdate();
    }

    public static onLateUpdate()
    {
    }
}