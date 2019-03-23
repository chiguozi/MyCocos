export enum NetStatus
{
    close = 0,
    connecting = 1,
    connected = 2,
}

export class NetSocket
{
    private _socket: WebSocket;
    private _url:string;
    private _status:NetStatus;
    private _onOpen:Function;
    private _onMessage:Function;
    private _onClose:Function;
    private _onError:Function;
    private _target:any;

    constructor(url:string)
    {
        this._url = url;
    }

    public get status()
    {
        return this._status;
    }

    public init(target, onMesage, onOpen, onError, onClose)
    {
        this._target = target;
        this._onMessage = onMesage;
        this._onOpen = onOpen;
        this._onError = onError;
        this._onClose = onClose;
    }

    public connect()
    {
        this.cleanSocket();
        this._socket = new WebSocket(this._url);
        this._socket.onopen = ()=>
        {
            this._status = NetStatus.connected;
            if(this._onOpen)
                this._onOpen.call(this._target);
        }
        this._socket.onclose = ()=>
        {
            this._status = NetStatus.close;
            if(this._onClose)
                this._onClose.call(this._target);
        }
        this._socket.onerror = ()=>
        {
            this._status = NetStatus.close;
            if(this._onError)
                this._onError.call(this._target);
        }
        this._socket.onmessage = (e)=>
        {
            if(!e || !e.data)
                return;
            this.onMessage(e.data);
        }
        this._status = NetStatus.connecting;
    }

    private onMessage(data)
    {
        //data 格式化？
        if(this._onMessage)
            this._onMessage(data);
    }

    public cleanSocket()
    {
        this.close();
        this._socket.onclose = null;
        this._socket.onmessage = null;
        this._socket.onopen = null;
        this._socket.onerror = null;
        this._socket = null;

        this._onMessage = null;
        this._onClose = null;
        this._onMessage = null;
        this._onError = null;
        this._target = null;
    }

    public close()
    {
        if(this._socket)
        {
            try
            {
                this._socket.close();
            }
            catch(e)
            {

            }
        }
    }
}