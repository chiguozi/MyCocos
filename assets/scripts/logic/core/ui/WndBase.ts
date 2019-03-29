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

    public name:string;

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






}