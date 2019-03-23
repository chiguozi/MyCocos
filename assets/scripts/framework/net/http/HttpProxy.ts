import HttpRequest from "./HttpRequest";

 export default class HttpProxy
 {
     static HttpTimeout = 3000;
     public errorHandler : Function;
     public send(url:string, param:any, onComplete:Function)
     {
        let req = new HttpRequest();
        req.on(HttpRequest.EVENT_COMPLETE, null, onComplete)
        req.on(HttpRequest.EVENT_ERROR, null, this.errorHandler);
        req.setTimeout(HttpProxy.HttpTimeout);
        let msg = null;
        if(param)
            msg = JSON.stringify(param);
        req.send(url, msg, "post");
     }

     public get(url:string, param:any, onComplete:Function, onError?:Function)
     {
        let req = new HttpRequest();
        req.on(HttpRequest.EVENT_COMPLETE, null, onComplete)
        if(onError)
            req.on(HttpRequest.EVENT_ERROR, null, onError);
        req.setTimeout(HttpProxy.HttpTimeout);
        let msg = null;
        if(param)
            msg = JSON.stringify(param);
        req.send(url, msg, "get");
     }
 }