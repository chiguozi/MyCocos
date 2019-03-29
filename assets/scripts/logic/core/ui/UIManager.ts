import WndBase from "./WndBase";

export default class UIManager
{
    //防止子游戏import不了，使用变量的形式，如果有需要就改成enum
    public PopLayer = "PopLayer";
    public TipsLayer = "TipsLayer";
    public TopLayer = "TopLayer";  




    private uiRoot:cc.Node;
    //layerName => layerNode
    private layerMap = {};

    //string => wndbase
    private windowMap = {}


    public createUIRoot()
    {
        let canvas = cc.find("Canvas");
        if(canvas == null)
        {
            Logger.error("找不到Canvas");
            return;
        }
        let uiRoot = canvas.getChildByName("UIRoot");
        if(uiRoot == null)
        {
            uiRoot = new cc.Node("UIRoot");
            canvas.addChild(uiRoot);
        }
        this.uiRoot = uiRoot;
        this.addUILayer(uiRoot, this.PopLayer)
        this.addUILayer(uiRoot, this.TipsLayer)
        this.addUILayer(uiRoot, this.TopLayer)
    }


    private addUILayer(root:cc.Node, layer:string)
    {
        let node = root.getChildByName(layer);
        if(node == null)
        {
            node = new cc.Node(layer);
            root.addChild(node);
        }
        this.layerMap[layer] = node;
    }


    public registUI(wndbase:WndBase)
    {
        if(this.windowMap[wndbase.name] != null)
        {
            Logger.error("重复注册UI", wndbase.name);
            return;
        }
        this.windowMap[wndbase.name] = wndbase;
    }

    


}