export default class ViewBase
{
    public node:cc.Node;

    public get active()
    {
        return this.node.active;
    }

    public setNode(node:cc.Node)
    {
        if(node == null)
            return;
        this.node = node;
        this.initView();
    }

    //界面加载完后初始化
    protected initView()
    {}
    //面板打开回调
    protected onOpen(args?:[])
    {}
    //界面关闭时回调
    protected onClose()
    {}

    //界面销毁
    protected onDispose()
    {}


    public getComponent<T extends cc.Component>(path:string, type:string):T
    {
        if(this.node == null)
            return null;
        if(path == "" || path == null)
            return this.node.getComponent(type);
        let node = cc.find(path, this.node);
        if(node == null)
            return null;
        return node.getComponent(type);
    }

    public getChild(path:string):cc.Node
    {
        return cc.find(path, this.node);
    }

}