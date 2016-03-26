/**
 * 计时器系统
 */
var Ticker = (function () {
    function Ticker() {
        this.bodyQueue = [];
    }
    /**
     * 启动计时器
     * @param bodyList 物理队列
     */
    Ticker.prototype.start = function (bodyQueue) {
        this.bodyQueue = bodyQueue;
        this.lastTime = Date.now();
        var self = this;
        setInterval(this.onTicker.bind(this), 1000 / 60);
    };
    Ticker.prototype.onTicker = function () {
        var currentTime = Date.now();
        var duringTime = currentTime - this.lastTime;
        this.lastTime = currentTime;
        this.bodyQueue.map(function (body) {
            body.onTicker(duringTime / 100);
            body.updateDisplayObject();
        });
    };
    return Ticker;
}());
var Body = (function () {
    function Body(displayObject) {
        this.vx = 0;
        this.vy = 0;
        this.x = 0;
        this.y = 0;
        this.width = 0;
        this.height = 0;
        this.rotation = 0;
        this.scaleX = 1;
        this.scaleY = 1;
        this.displayObject = displayObject;
        this.x = displayObject.x;
        this.y = displayObject.y;
        this.rotation = displayObject.rotation;
        this.scaleX = displayObject.scaleX;
        this.scaleY = displayObject.scaleY;
    }
    Body.prototype.onTicker = function (duringTime) {
    };
    Body.prototype.updateDisplayObject = function () {
        //根据物体位置更新显示对象属性
        var displayObject = this.displayObject;
        displayObject.x = this.x;
        displayObject.y = this.y;
        displayObject.rotation = this.rotation;
        displayObject.scaleX = this.scaleX;
        displayObject.scaleY = this.scaleY;
    };
    return Body;
}());
//# sourceMappingURL=animation.js.map