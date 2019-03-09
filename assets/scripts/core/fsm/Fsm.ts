import FsmState from "./FsmState";

export default class Fsm
{
    public name:string;
    public stateMap = {}
    public currentState:FsmState;

    public get isRunning()
    {
        return this.currentState != null;
    }

    public registState(state:FsmState)
    {
        if(state == null)
            return;
        let key = state.type;
        if(this.stateMap[key] != null)
        {
            cc.log("重复注册状态机:" + key)
            return;
        }
        this.stateMap[key] = state;
        state.onInit(this);
    }

    public removeState(key)
    {
        if(!this.hasState(key))
            return;
        let state = this.getState(key);
        if(state == this.currentState)
        {
            cc.log("正在运行的state不能移除");
            return;
        }
        state.onDestory();
        this.stateMap[key] = null;
    }


    public changeState(key)
    {
        let state = this.getState(key);
        if(state == null)
        {
            cc.log("找不到状态"); 
            return;
        }
        if(this.currentState != null)
        {
            this.currentState.onLeave();
        }
        this.currentState = state;
        state.onEnter();
    }        


    public start(key)
    {
        if(this.isRunning)
            return;
        let state = this.getState(key);
        if(state == null)
            return;
        this.currentState = state;
        this.currentState.onEnter()
    }


    public getState(key):FsmState
    {
        return this.stateMap[key];
    }

    public hasState(key)
    {
        return this.stateMap[key] != null;
    }


    public update()
    {
        if(this.currentState == null)
            return;
        this.currentState.onUpdate();
    }
}