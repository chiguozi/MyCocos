import WndBase from "../core/ui/WndBase";

export class TestUI1 extends WndBase
{
    protected onInit()
    {
        this.name = "TestUI1";
        this.resPath = "ui/testUi";
        this.layer = Global.UI.PopLayer;
    }

    protected initView()
    {
        Logger.error("initview")
    }

    public onOpen()
    {
        super.onOpen();
        Logger.error("onOpen")
    }
}



export class TestUI2 extends WndBase
{
    protected onInit()
    {
        this.name = "TestUI2";
        this.resPath = "ui/testUi2";
        this.layer = Global.UI.PopLayer;
    }

    protected initView()
    {
        Logger.error("initview")
    }

    public onOpen()
    {
        super.onOpen();
        Logger.error("onOpen")
    }
}