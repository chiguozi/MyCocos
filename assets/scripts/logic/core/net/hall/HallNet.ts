import EventDispatcher from "../../../../framework/event/EventDispatcher";
import { NetJccommon } from "./NetEvent";
import { HallErrorHandler } from "./HallErrorHandler";
//大厅网络管理器
export default class HallNet extends EventDispatcher
{
    private USEWS = false;
    private defaultErrorHandler:HallErrorHandler = new HallErrorHandler;

    public sendGlobal(func:string, param:any, onComplete?:Function, errorHandler?:Function)
    {
        let url = Global.Setting.urls.globalUrl;
        let serverData = this.getMsgParam(NetJccommon.mod, func, param);
        Global.Http.send(url, serverData, (msg)=>
        {
            this.onMessage(msg, onComplete, errorHandler, url);
        }, null);
    }

    //大厅内http协议请求
    //errorHandler  模块定制错误处理  返回true 则继续执行， false丢弃
    public send(mod:string, key:string, param:any, onComplete?:Function, errorHandler?:Function)
    {
        let serverData = this.getMsgParam(mod, key, param);
        let url = cc.js.formatStr(Global.Setting.urls.hallHttpUrl, mod, key);
        Global.Http.send(url, serverData, (msg)=>{
            this.onMessage(msg, onComplete, errorHandler, url);
        }, null);
    }



    private onMessage(msg, onComplete:Function, errorHandler:Function, url:string)
    {
        let content = Global.Toolkit.decodeMsg(msg);
        if(content == "")
        {
            Logger.error("解析协议失败", msg, url);
            return;
        }
        let serverObj = null;
        try
        {
            serverObj = JSON.parse(content);
        }
        catch(e)
        {
            Logger.error("解析JSON失败", msg, url, e && e.message);
            return;
        }
        let tryErrorFunc = errorHandler? errorHandler : this.defaultErrorHandler.tryHandleError;

        if(!tryErrorFunc(serverObj))
            return;

        //@todo  协议预处理


        if(onComplete != null)
        {
            onComplete(serverObj);
        }
        else
        {
            //没有回调 默认用事件的形式派发处处
            if(serverObj._func && serverObj._func != "")
            {
                this.event(serverObj._func, serverObj);
            }
        }
    }





    public tryHandleError(serverData)
    {
        return this.defaultErrorHandler.tryHandleError(serverData);
    }

    private getMsgParam(mod:string, func:string, param:any)
    {
        let msg:any = {}
        if(this.USEWS)
        {
            msg._mod = mod
            msg._func = func;
        }
        msg._param = param? param : {}
        msg._check = ""
        return msg;
    }
}