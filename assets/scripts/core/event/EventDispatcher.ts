export default class EventDispatcher  {
    private eventMap = {}


    public hasListener(type)
    {
        let listener = this.eventMap && this.eventMap[type];
        return listener != null;
    }

    public on(type:string, caller, method:Function, args)
    {
        return this._createListener(type, caller, method, args, false);
    }

    public once(type:string, caller, method:Function, args)
    {
        return this._createListener(type, caller, method, args, true);
    }

    /**
     * 从 EventDispatcher 对象中删除侦听器。
     * @param type		事件的类型。
     * @param caller	事件侦听函数的执行域。
     * @param listener	事件侦听函数。
     * @param onceOnly	（可选）如果值为 true ,则只移除通过 once 方法添加的侦听器。
     */
    public off(type:string, caller, method:Function, onceOnly = false)
    {
        if(this.eventMap == null || this.eventMap[type] == null)
            return this;

        let listener = this.eventMap[type];

        //单个handler
        if(listener.run)
        {
            if((caller == null || listener.caller == caller) && (method == null || listener.method == method) && (!onceOnly || listener.once))
            {
                delete(this.eventMap[type]);
                listener.recover();
            }
        }
        else
        {
            let count = 0;
            let n = listener.length;
            for (let i = 0; i < n; i++) {
                let item = listener[i];
                if (!item)
                {
                    count++;
                    continue;
                }
                if (item && (!caller || item.caller === caller) && (listener==null || item.method === listener) && (!onceOnly || item.once)) {
                    count++;
                    listener[i] = null;
                    item.recover();
                }
            }
            //如果全部移除，则删除索引
            if (count === n) delete this.eventMap[type];
        }

        return this;
    }

    public offAll(type:string) 
    {
        var events = this.eventMap;
        if (!events) return this;
        if (type) 
        {
            this.recoverHandlers(events[type]);
            delete events[type];
        } 
        else 
        {
            for (let name in events) 
            {
                this.recoverHandlers(events[name]);
            }
        }
    }

    public offAllByCaller(caller:*) {
        if (caller && this.eventMap) {
            for (var name in this.eventMap) {
                this.off(name, caller, null);
            }
        }			
        return this;
    }


    private recoverHandlers(arr:*):void {
        if (!arr) return;
        if (arr.run) {
            arr.recover();
        } else {
            for (let i = arr.length - 1; i > -1; i--) {
                if (arr[i]) {
                    arr[i].recover();
                    arr[i] = null;
                }
            }
        }
    }


    private _createListener(type:string, caller, method:Function, args, once, offBefroe = false;)
    {
        offBefroe && this.off(type, caller, method, once);

        let handler = EventHandler.create(caller || this, method, args, once);
        			//默认单个，每个对象只有多个监听才用数组，节省一个数组的消耗
        if (!this.eventMap[type]) this.eventMap[type] = handler;
        else {
            if (!this.eventMap[type].run) this.eventMap[type].push(handler);
            else this.eventMap[type] = [this.eventMap[type], handler];
        }
        return this;
    }

}
