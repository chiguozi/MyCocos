import EventDispatcher from "../../../../framework/event/EventDispatcher";
import { NetJccommon } from "./NetEvent";
//大厅网络管理器
export default class HallNet extends EventDispatcher
{
    private USEWS = false;

    public sendGlobal(func:string, param:any, onComplete?:Function, useDefaultErrorHandler:boolean = true)
    {
        let url = Global.Setting.urls.globalUrl;
        let serverData = this.getMsgParam(NetJccommon.mod, func, param);
        Global.Http.send(url, serverData, (msg)=>
        {
            this.onMessage(msg, onComplete, useDefaultErrorHandler, url);
        }, null);
    }

    //大厅内http协议请求
    public send(mod:string, key:string, param:any, onComplete?:Function, useDefaultErrorHandler:boolean = true)
    {
        let serverData = this.getMsgParam(mod, key, param);
        let url = cc.js.formatStr(Global.Setting.urls.hallHttpUrl, mod, key);
        Global.Http.send(url, serverData, (msg)=>{
            this.onMessage(msg, onComplete, useDefaultErrorHandler, url);
        }, null);
    }





    private onMessage(msg, onComplete:Function, useDefaultErrorHandler:boolean, url:string)
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
        if(useDefaultErrorHandler)
        {
            //check Error
            //@todo 把特殊的错误处理传进来
        }

        //@todo  协议预处理


        if(onComplete != null)
        {
            onComplete(serverObj);
        }
        else
        {
            if(serverObj._func && serverObj._func != "")
            {
                this.event(serverObj._func, serverObj);
            }
        }
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