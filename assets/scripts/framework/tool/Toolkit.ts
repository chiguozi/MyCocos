import * as Crypto from "../../lib/cryptoTs/crypto-ts"
import { MD5 } from "../../lib/cryptoTs/algo/MD5";
import { Hasher } from "../../lib/cryptoTs/lib/Hasher";
export default class ToolKit
{
    private cryptoKey = "yaoxing8901234561234567890123488"
    private cryptoIv: string = "yaoxing890123488";

    private MD5Hasher;


    public decodeMsg(msg)
    {
        let tmp = msg.trim();
        if (tmp.charAt(0) == "{")
            return msg;
        else
        {
            return this.aesDecrypt(tmp); 
        }
    }


    public aesDecrypt(msg)
    {
        let key = Crypto.enc.Utf8.parse(this.cryptoKey);
        let iv = Crypto.enc.Utf8.parse(this.cryptoIv);
        let decrypted = Crypto.AES.decrypt(msg, key, {
            iv: iv,
            mode: Crypto.mode.CBC,
            padding: Crypto.pad.NoPadding
        });
        return decrypted.toString(Crypto.enc.Utf8);
    }


    public md5(content)
    {
        if(this.MD5Hasher == null)
        {
            this.MD5Hasher = Hasher._createHelper(MD5);
        }
        return this.MD5Hasher(content)
    }
}