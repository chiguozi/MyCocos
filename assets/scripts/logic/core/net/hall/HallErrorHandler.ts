export class HttpNetExtraData
{
    //外部可配置信息
    //链接超时  暂时先不用
    public timeout:3000;
    //失败后是否显示提示
    public showErrorTips = false;
    //重连总次数  默认为3
    public retryTotalTime = 3;





    //重连逻辑使用
    public url:string;
    //重试次数
    public retryTimes = 0;
    public param:any;
    public onComplete:Function;
    public errorHandler:Function;

}


export class HallErrorHandler
{
    //服务器业务逻辑错误处理
    public tryHandleError(serverData):boolean
    {
        if(serverData == null)
            return true;
        if(serverData._errno == null)
            return false;

        return true;
    }
}