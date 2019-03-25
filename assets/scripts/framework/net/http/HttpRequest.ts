import EventDispatcher from "../../event/EventDispatcher";
import { Logger } from "../../debug/Logger";

export default class HttpRequest extends EventDispatcher
{
    public static EVENT_COMPLETE = "complete";
    public static EVENT_ERROR = "error";

    private _http:XMLHttpRequest = new XMLHttpRequest;
    private _data:any;
    private _url:string;
    private _responseType:string;

    public get data()
    {
        return this._data;
    }

    public get url()
    {
        return this._url;
    }

    public send(url:string, data:any = null, method:string = "get", responseType = "text", headers:[] = null)
    {
        this._responseType = responseType;
        this._data = null;
        this._url = url;

        let http = this._http;
        http.open(method, url, true);
        if(headers && headers.length > 0)
        {
            for(let i = 0; i < headers.length; i++)
            {
                http.setRequestHeader(headers[i++], headers[i]);
            }
        }
        else
        {
            http.setRequestHeader("Content-Type", "text/plain");
        }
        http.responseType = responseType !== "arraybuffer" ? "text" : "arraybuffer";
        http.onreadystatechange = this.onReadyStateChange.bind(this)
        http.send(data);

        http.onerror = (e)=>{ this.httpEvent("onerror", e)}
        http.onabort = (e)=>{ this.httpEvent("onabort", e)}
        http.ontimeout = (e)=>{ this.httpEvent("ontimeout", e)}
    }

    public setTimeout( timeout )
    {
        if(this._http)
        {
            this._http.timeout = timeout;
            this._http.ontimeout = (e) =>
            {
                this.onError("request timeout  " + e)
            } 
        }
    }

    private httpEvent(type, event)
    {
        Logger.error(type, event);
    }

    private onReadyStateChange()
    {
        if(this._http.readyState == 4)
        {
            if(this._http.status > 0 && this._http.status <= 400)
            {
                this.onComplete()
            }
            else
            {
                this.onError("[" + this._http.status + "]" + this._http.statusText + ":" + this._http.responseURL)
            }
        }
    }

    private onError(content)
    {
        Logger.error(content, this._url);
        this.event(HttpRequest.EVENT_ERROR, this._url);
    }

    private onComplete()
    {
        this.clear();
        var flag:Boolean = true;
        try 
        {
            if (this._responseType === "json") 
            {
                this._data = JSON.parse(this._http.responseText);
            //暂不支持xml
            // } else if (this._responType === "xml") {
            // 	this._data = Utils.parseXMLFromString(this._http.responseText);
            } else 
            {
                this._data = this._http.response || this._http.responseText;
            }
        } 
        catch (e) 
        {
            flag = false;
            this.onError(e)
        }
        flag && this.event(HttpRequest.EVENT_COMPLETE, this._data instanceof Array ? [this._data] : this._data);
    }

    private clear()
    {
        this._http.onreadystatechange = null;
    }

}