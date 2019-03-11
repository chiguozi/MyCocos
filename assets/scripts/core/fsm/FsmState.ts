import Fsm from "./Fsm";

export default class FsmState
{
    public type:string;
    public fsm:Fsm;
    public onInit(fsm:Fsm)
    {
        this.fsm = fsm;
    }
    public onEnter(){}
    public onLeave(){}
    public onDestory(){}

    public onUpdate(){}

    public changeStage(type:string)
    {
        this.fsm.changeState(type);
    }
}
