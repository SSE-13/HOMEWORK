/**
 * 计时器系统
 */
class Ticker {

    bodyQueue = [];

    lastTime;

    /**
     * 启动计时器
     * @param bodyList 物理队列
     */
    start(bodyQueue) {
        this.bodyQueue = bodyQueue;
        this.lastTime = Date.now();
        var self = this;
        setInterval(this.onTicker.bind(this), 1000 / 60);
    }

    onTicker() {
        var currentTime = Date.now();
        var duringTime = currentTime - this.lastTime;
        this.lastTime = currentTime;
        this.bodyQueue.map(function(body) {
            body.onTicker(duringTime / 100);
            body.updateDisplayObject();
        });
    }
}


class Body {

    vx = 0;
    vy = 0;
    x = 0;
    y = 0;
    width = 0;
    height = 0;

    displayObject;

    constructor(displayObject: DisplayObject) {
        this.displayObject = displayObject;
    }

    public onTicker(duringTime) {

    }
    
    public updateDisplayObject(){
          //根据物体位置更新显示对象属性
        var displayObject = this.displayObject;
        displayObject.x = this.x;
        displayObject.y = this.y;
    }
    
}
