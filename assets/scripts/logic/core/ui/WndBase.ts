import ViewBase from "./ViewBase";

export enum LoadingState
{
    None = 0,
    Loading = 1,
    Loaded = 2,
}

export default class WndBase extends ViewBase
{
    //加载状态
    public loadingState:LoadingState = LoadingState.None;
    //层级
    public layer:string;
    //动画类型
    public animType:string;

    //界面名称
    public name:string;
    //资源路径
    public resPath:string;

    public args:any[] = null;

    private _active = false;

    public set active(value)
    {
        this._active = value;
        if(this.node && cc.isValid(this.node))
        {
            this.node.active = value;
        }
    }

    public get active()
    {
        return this._active;
    }

    constructor()
    {
        super();
        this.onInit();
        this.registToUIManager();
    }

    protected onInit()
    {}

    protected registToUIManager()
    {
        Global.UI.registUI(this);
    }


    public reshow()
    {
        this.onReshow();
    }

    protected onReshow()
    {}


    public close()
    {
        Global.UI.close(this.name);
    }


    public get isLoaded()
    {
        return this.loadingState == LoadingState.Loaded;
    }

    public get isLoading()
    {
        return this.loadingState == LoadingState.Loading;
    }
}   