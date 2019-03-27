import Urls from "./Urls";
import BaseSetting from "../../../framework/setting/BaseSetting";
import SettingData from "./SettingData";

export default class Setting extends BaseSetting
{
    public Urls:Urls;

    public setup()
    {
        this.settingData = new SettingData();
        this.settingData.setup(this.storage);
    }
}