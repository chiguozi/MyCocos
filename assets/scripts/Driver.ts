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
import Global from './logic/core/Global'
import {Logger} from './framework/debug/Logger'
@ccclass
export default class Driver extends cc.Component 
{
    start () 
    {   
        Global.setup();
        (<any>window).Global = Global;
        (<any>window).Logger = Logger;
        let param = "{\"appid\":12,\"uid\":104986,\"deviceid\":\"507dce0102bf80934a8af3bff2586dbb\",\"sign\":\"\",\"token\":\"+fELf7Qvg1UyjiY/laLXyG3h8S/9Zj3EKm12PHPY0oIaUp1tcZIbMpnQj63YbyWoG73oba1kNqBVCWLwoJmlbKPwkp/zhUGmlDK5YIOXmxo=\",\"type\":2,\"os_type\":1,\"reg_info\":\"file:///K:/H5/gitproject/bin/index.html\",\"source_type\":0,\"invite_code\":0,\"pack\":222222}";
        let p = JSON.parse(param);
        Global.HallNet.sendGlobal("VisitorLogin", p)

        Global.HallNet.on("VisitorLogin", this, (netData)=>
        {
            Logger.logObj(netData);
        })
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

