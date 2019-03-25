import { Logger } from "../debug/Logger";

export default class Storage
{
    //暂时所有key 在Storage中定义  后续考虑分文件
    //Game中的key不要这定义
    public static TokenKey = "token";
    public static UidKey = "token";
    //渠道号
    public static ChannelKey = "channel";
    //手机号码
    public static PhoneKey = "phone";
    //md5后的手机密码
    public static Md5PwdKey = "pwd";


    //默认为string格式存储  包括数字
    public set(key:string, value:any)
    {
        if(value == null)
            value = ""
        let newKey = this.getFinalKey(key);
        cc.sys.localStorage.setItem(newKey, value)
    }

    public setObject(key, value)
    {
        if(value == null)
            return;
        let content = ""
        try
        {
            content = JSON.stringify(value)
            this.set(key, content);
        }
        catch(e)
        {
            Logger.error("Storage.setObject 出错", e && e.message)
            return;
        }
    }

    public setBool(key, value:boolean)
    {
        let content = value? "1" : "0"
        this.set(key, content);
    }


    public get(key)
    {
        let newKey = this.getFinalKey(key);
        let value = cc.sys.localStorage.getItem(newKey);
        if(value == null)
            value = ""
        return value;
    }

    public getObject(key):any
    {
        let content = this.get(key);
        if(content == "")
            return null;
        let obj = null;
        try
        {
            obj = JSON.parse(content);
        }
        catch(e)
        {
           Logger.error("Storage.getObject 出错", e && e.message)
        }
        return obj;
    }

    public getBool(key):boolean
    {
        let content = this.get(key);
        return content == "1";
    }

    public removeKey(key)
    {
        let newKey = this.getFinalKey(key); 
        cc.sys.localStorage.removeItem(newKey);
    }


    //对key做加工
    private getFinalKey(key)
    {
        return key;
    }
}