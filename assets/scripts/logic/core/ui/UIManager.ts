import WndBase, { LoadingState } from "./WndBase";
import ResourceManager from "../../../framework/resource/ResourceManager";

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
    private windowMap:{[key:string]:WndBase}= {}
    private showWindowList = [];

    private resourceMgr:ResourceManager;

    public setup(resourceMgr:ResourceManager)
    {
        this.resourceMgr = resourceMgr;
    }

    //初始化界面
    public initUIRoot()
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


    //注册UI
    public registUI(wndbase:WndBase)
    {
        if(this.windowMap[wndbase.name] != null)
        {
            Logger.error("重复注册UI", wndbase.name);
            return;
        }
        this.windowMap[wndbase.name] = wndbase;
    }



    public getWindow<T extends WndBase>(wndName:string):T
    {
        if(this.windowMap[wndName] == null)
        {
            Logger.error("没有注册界面！！！需要先注册", wndName);
            return null;
        }
        let window = this.windowMap[wndName];
        return window as T;
    }
    

    public show(wndName:string, ...args)
    {
        if(this.windowMap[wndName] == null)
        {
            Logger.error("没有注册界面！！！需要先注册", wndName);
            return;
        }
        let window = this.windowMap[wndName] as WndBase;
        window.args = args
        //界面正在加载  只设置active属性
        if(window.isLoading)
        {
            window.active = true;
            return;
        }
        //已经加载过
        if(window.isLoaded)
        {
            //界面已经打开  触发onreshow
            if(window.active == true)
            {   
                window.reshow();
                return;
            }
            this.openWindowInternal(window);
            return;
        }
        window.active = true;

        window.loadingState = LoadingState.Loading;
        if(window.resPath == null || window.resPath == "")
        {
            Logger.error("未设置界面资源路径！！！", window.name);
            return;
        }
        this.resourceMgr.loadRes(window.resPath, (error, prefab)=>
        {
            this.onWindowLoaded(window, error, prefab);
        })
    }

    public close(wndName:string)
    {
        let window = this.getWindow<WndBase>(wndName);
        if(window == null)
            return;
        //@todo 根据动画类型关闭界面
        this.realClose(window);
    }


    public dispose(wndName:string)
    {
        let window = this.getWindow<WndBase>(wndName);
        if(window == null)
            return;
        window.loadingState = LoadingState.None;
        window.onDispose();
        if(window.node != null && cc.isValid(window.node, true))
        {
            window.node.removeFromParent(true);
            window.node.destroy();
        }
    }


    private onWindowLoaded(window:WndBase, error, prefab)
    {
        if(error != null)
        {
            Logger.error("加载UI出错", window.name, error);
            return;
        }
        window.loadingState = LoadingState.Loaded;
        window.setNode(cc.instantiate(prefab));
        window.node.active = window.active;
        //防止资源没加载完关闭
        if(window.active)
            this.openWindowInternal(window);
    }


    private realClose(window)
    {
        window.active = false;
        window.onClose();
        this.removeWindowFromShowList(window);
    }




    //调整层级
    private addToTop(window : WndBase)
    {
        if(!window.isLoaded)
            return;
        let layerView = this.layerMap[window.layer]
        if(layerView == null)
        {
            layerView = this.layerMap[this.PopLayer];
        }
        window.node.setParent(null);
        layerView.addChild(window.node);
    }



    private openWindowInternal(window:WndBase)
    {
        this.showWindowList.push(window);
        this.addToTop(window);
        window.active = true;
        window.onOpen(window.args);
        //播放动画
    }


    private removeWindowFromShowList(window:WndBase)
    {
        for(let i = 0; i < this.showWindowList.length; i++)
        {
            if(this.showWindowList[i] == window)
            {
                this.showWindowList.splice(i, 1);
            }
        }
    }

}