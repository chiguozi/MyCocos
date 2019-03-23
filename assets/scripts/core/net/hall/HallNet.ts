import EventDispatcher from "../../event/EventDispatcher";
//大厅网络管理器
export default class HallNet extends EventDispatcher
{
    private USEWS = false;

    public sendGlobal()
    {
        
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