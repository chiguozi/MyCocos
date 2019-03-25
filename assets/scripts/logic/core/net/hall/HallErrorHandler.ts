export class HallErrorHandler
{
    public tryHandleError(serverData):boolean
    {
        if(serverData == null)
            return true;
        if(serverData._errno == null)
            return false;

        return true;
    }
}