import Urls from "./Urls";
import Storage from "./Storage";

//开关  + 本地存储 + app配置
export default class Setting
{
    public urls:Urls = new Urls;
    public storage:Storage = new Storage;
}