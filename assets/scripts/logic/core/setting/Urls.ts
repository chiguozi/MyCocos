export default class Urls
{
    //jccommon url
    public globalUrl:string;
    //图标配置路径
    public webIconUrl:string;
    //下载地址
    public downLoadUrl:string;
    //邀请地址
    public inviteUrl:string;

    //需要socket
    // //大厅完成socketurl
    // public hallSocketUrl:string;
    //大厅完成httpURL
    public hallHttpUrl:string;

    public parse(serverCfg:any)
    {
        this.globalUrl = serverCfg.login_url;
        this.webIconUrl = serverCfg.web_icon;
        this.downLoadUrl = serverCfg.download_url;
        this.inviteUrl = serverCfg.invite_url;
    }


    public initLoginInfo(hallUrl, uid, token)
    {
        this.hallHttpUrl = hallUrl + "%s?_func=%s&uid=" + uid + "&token=" + token;
    }

    public getGlobalUrl()
    {
        return this.globalUrl;
    }
}