// Learn TypeScript:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass} = cc._decorator;
import { Logger } from './framework/debug/Logger';
import Global from './logic/core/Global';
import { TestUI1, TestUI2 } from './logic/test/testUI';
@ccclass
export default class Driver extends cc.Component 
{
    start () 
    {   
        Global.setup();
        (<any>window).Global = Global;
        (<any>window).Logger = Logger;

        Global.UI.initUIRoot();

        new TestUI1();
        new TestUI2();

        Global.UI.show("TestUI1")
        Global.UI.show("TestUI2")
    }


    update()
    {
        Global.onUpdate();
    }


    lateUpdate()
    {
        Global.onLateUpdate();
    }
}

