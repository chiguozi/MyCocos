import Global from "../../Global";
import EventDispatcher from "../../../../framework/event/EventDispatcher";
//大厅网络管理器
export default class HallNet extends EventDispatcher
{
    private USEWS = false;

    public sendGlobal(func:string, param:any, )
    {
        let url = Global.Setting.urls.globalUrl;

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