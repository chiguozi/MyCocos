import EventDispatcher from "./event/EventDispatcher";

export default  class Global 
{
    public static Event:EventDispatcher;

    public static setup()
    {
        this.Event = new EventDispatcher();
    }
}