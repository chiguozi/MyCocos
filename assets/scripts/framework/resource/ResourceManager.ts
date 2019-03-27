//资源管理器
//@todo  资源加载，依赖管理， 资源释放
export default class ResourceManager
{
    //加载单个资源
    //只能加载Resources下资源，不能加后缀名
    public loadRes(url:string, onComplete?:(error: Error, resource: any) => void, type?, onProgress?:(completedCount: number, totalCount: number, item: any) => void)
    {
        cc.loader.loadRes(url, type, onProgress, onComplete);
    }

    //加载资源列表
    public loadResArr(urls:string[], onComplete?:(error: Error, resource: any) => void, type?, onProgress?:(completedCount: number, totalCount: number, item: any) => void)
    {
        cc.loader.loadResArray(urls, type, onProgress, onComplete);
    }

    //加载路径下所有资源
    public loadResDir(url:string, onComplete?:(error: Error, resource: any) => void, type?, onProgress?:(completedCount: number, totalCount: number, item: any) => void)
    {
        cc.loader.loadResDir(url, type, onProgress, onComplete);
    }

    //支持加载单个或多个资源
    //支持加载远程资源
    //支持本地资源（绝对路径）
    // cc.loader.load('a.png', function (err, tex) {
    //     cc.log('Result should be a texture: ' + (tex instanceof cc.Texture2D));
    // });
    
    // cc.loader.load('http://example.com/a.png', function (err, tex) {
    //     cc.log('Should load a texture from external url: ' + (tex instanceof cc.Texture2D));
    // });
    
    // cc.loader.load({url: 'http://example.com/getImageREST?file=a.png', type: 'png'}, function (err, tex) {
    //     cc.log('Should load a texture from RESTful API by specify the type: ' + (tex instanceof cc.Texture2D));
    // });
    
    // cc.loader.load(['a.png', 'b.json'], function (errors, results) {
    //     if (errors) {
    //         for (var i = 0; i < errors.length; i++) {
    //             cc.log('Error url [' + errors[i] + ']: ' + results.getError(errors[i]));
    //         }
    //     }
    //     var aTex = results.getContent('a.png');
    //     var bJsonObj = results.getContent('b.json');
    // });
    public load(resources, onComplete?:Function, onProgress? )
    {
        cc.loader.load(resources, onProgress, onComplete);
    }



    //-----资源释放接口 -------

    public releaseRes(url:string, type?)
    {
        cc.loader.releaseRes(url, type);
    }

    public releaseAsset(asset)
    {
        cc.loader.releaseAsset(asset);
    }

    public releaseDir(url, type?)
    {
        cc.loader.releaseResDir(url, type);
    }

    public release(asset)
    {
        cc.loader.release(asset);
    }

}