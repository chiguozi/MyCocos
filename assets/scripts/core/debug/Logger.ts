export default class Logger 
{
    public log(content)
    {
        cc.log(content);
    }

    public warn(content)
    {
        cc.warn(content);
    }

    public error(content)
    {
        cc.error(content);
    }
}