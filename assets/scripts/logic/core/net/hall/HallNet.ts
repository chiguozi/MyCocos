import EventDispatcher from "../../../../framework/event/EventDispatcher";
import { NetJccommon } from "./NetEvent";
import { HallErrorHandler, HttpNetExtraData as NetExtraData } from "./HallErrorHandler";
//大厅网络管理器
export default class HallNet extends EventDispatcher
{
    private USEWS = false;
    //通用协议错误处理 （业务逻辑错误）
    private defaultErrorHandler:HallErrorHandler = new HallErrorHandler;

    public sendGlobal(func:string, param:any, onComplete?:Function, errorHandler?:Function, extraData?:NetExtraData)
    {
        let url = Global.Setting.urls.globalUrl;
        let serverData = this.getMsgParam(NetJccommon.mod, func, param, true);
        this.sendInternal(url, serverData, onComplete, errorHandler, extraData);
    }

    //大厅内http协议请求
    //errorHandler  模块定制错误处理  返回true 则继续执行， false丢弃
    public send(mod:string, key:string, param:any, onComplete?:Function, errorHandler?:Function,extraData?:NetExtraData)
    {
        let serverData = this.getMsgParam(mod, key, param);
        let url = cc.js.formatStr(Global.Setting.urls.hallHttpUrl, mod, key);
        this.sendInternal(url, serverData, onComplete, errorHandler, extraData);
    }



    private sendInternal(url, serverData, onComplete, errorHandler, extraData?:NetExtraData)
    {
        Global.Http.send(url, serverData, (msg)=>
        {
            this.onMessage(msg, onComplete, errorHandler, url);
        }, ()=>
        {
            if(extraData == null)
            {
                extraData = new NetExtraData();
                extraData.param = serverData;
                extraData.onComplete = onComplete;
                extraData.errorHandler = errorHandler;
                extraData.url = url;
            }
            this.onMessegeError(extraData);
        });
    }


    private onMessegeError(extraData:NetExtraData)
    {
        extraData.retryTimes++;
        //小于重连次数 则重新发送
        if(extraData.retryTimes < extraData.retryTotalTime)
        {
            this.sendInternal(extraData.url, extraData.param, extraData.onComplete, extraData.errorHandler, extraData);
            return;
        }
        else
        {
            //@todo  通用错误处理  弹窗或者上报
        }
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




    //自定义errorHandler 可以处理完定制的  再执行通用的
    public tryHandleError(serverData)
    {
        return this.defaultErrorHandler.tryHandleError(serverData);
    }

    private getMsgParam(mod:string, func:string, param:any, useMode = false)
    {
        let msg:any = {}
        if(useMode)
        {
            msg._mod = mod
            msg._func = func;
        }
        msg._param = param? param : {}
        msg._check = ""
        return msg;
    }
}