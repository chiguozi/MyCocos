import BaseSettingData from "../setting/BaseSettingData";
import ResourceManager from "../resource/ResourceManager";

export default class AudioManager 
{
    private settingData:BaseSettingData;
    private resourceMgr:ResourceManager;

    private curBgm:string = ""
    private lastBgm:string = ""

    public commonBtnSoundUrl = "";
    public commonCloseSoundUrl = "";

    public setup(settingData:BaseSettingData, resourceMgr:ResourceManager)
    {
        this.settingData = settingData;
        this.resourceMgr = resourceMgr;
        //设置单个音源的最大实例个数
        cc.audioEngine.setMaxAudioInstance(12);
        this.setMusicVolume(this.settingData.musicVolume)
        this.setSoundVolume(this.settingData.soundVolume)
    }

    //url:  Resouces下的完整路径
    public playMusic(url:string)
    {
        if(url == this.curBgm || url == "")
            return;
        if(!this.settingData.musicEnable)
            return;
        this.curBgm = url;
        this.resourceMgr.loadRes(url, (error, audio)=>
        {
            if(error != null)
            {
                Logger.error("音效加载失败", error, url);
                return;
            }
            if(url != this.curBgm)
            {
                Logger.error("声音未加载完就切换音乐", url, this.curBgm);
                return;
            }
            cc.audioEngine.playMusic(audio, true);
        }, cc.AudioClip);
    }

    //暂不提供暂停的接口，有需要时再添加
    public stopMusic()
    {
        cc.audioEngine.stopMusic();
        this.lastBgm = this.curBgm;
        this.curBgm = "";
    }

    //播放音效
    public playSound(url:string)
    {
        if(!this.settingData.soundEnable)
            return;
        this.resourceMgr.loadRes(url, (error, audio)=>
        {
            if(error != null)
            {
                Logger.error("音效加载失败", error, url);
                return;
            }
            cc.audioEngine.playEffect(audio, true);
        }, cc.AudioClip);
    }

    //停止所有音效
    public stopAllEffect()
    {
        cc.audioEngine.stopAllEffects();
    }

    //@todo  通用声音比较多时，考虑注册的形式
    //通用按钮声音  
    public playBtnSound()
    {
        if(this.commonBtnSoundUrl != "")
            this.playSound(this.commonBtnSoundUrl);
    }

    public playCloseSound()
    {
        if(this.commonCloseSoundUrl != "")
            this.playSound(this.commonCloseSoundUrl);
    }


    public setMusicEnable(value)
    {   
        this.settingData.setMusicEnable(value);

        if(!value)
            this.stopMusic()
        else   
            this.playMusic(this.lastBgm);
    }

    public setSoundEnable(value)
    {
        this.settingData.setSoundEnable(value);
        if(!value)
            this.stopAllEffect();
    }

    public setMusicVolume(value)
    {
        this.settingData.musicVolume = value;
        cc.audioEngine.setMusicVolume(value);
    }

    public setSoundVolume(value)
    {
        this.settingData.soundVolume = value;
        cc.audioEngine.setEffectsVolume(value);
    }

}