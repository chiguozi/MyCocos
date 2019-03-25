import HttpRequest from "./HttpRequest";

 export default class HttpProxy
 {
     static HttpTimeout = 3000;
     public send(url:string, param:any, onComplete:Function, onError:Function)
     {
        let req = new HttpRequest();
        req.on(HttpRequest.EVENT_COMPLETE, null, onComplete)
        req.on(HttpRequest.EVENT_ERROR, null, onError);
        req.setTimeout(HttpProxy.HttpTimeout);
        let msg = this.getSendContent(param);
        req.send(url, msg, "post");
     }

     public get(url:string, param:any, onComplete:Function, onError?:Function)
     {
        let req = new HttpRequest();
        req.on(HttpRequest.EVENT_COMPLETE, null, onComplete)
        if(onError)
            req.on(HttpRequest.EVENT_ERROR, null, onError);
        req.setTimeout(HttpProxy.HttpTimeout);
        let msg = this.getSendContent(param);
        req.send(url, msg, "get");
     }

     private getSendContent(param)
     {
        if(param == null || param == "")
            return null;
        if(typeof(param) == "string")
            return param;
        return JSON.stringify(param)

     }
 }