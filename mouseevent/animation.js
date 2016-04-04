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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYW5pbWF0aW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYW5pbWF0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOztHQUVHO0FBQ0g7SUFBQTtRQUVJLGNBQVMsR0FBRyxFQUFFLENBQUM7SUF3Qm5CLENBQUM7SUFwQkc7OztPQUdHO0lBQ0gsc0JBQUssR0FBTCxVQUFNLFNBQVM7UUFDWCxJQUFJLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQztRQUMzQixJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQztRQUMzQixJQUFJLElBQUksR0FBRyxJQUFJLENBQUM7UUFDaEIsV0FBVyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLElBQUksR0FBRyxFQUFFLENBQUMsQ0FBQztJQUNyRCxDQUFDO0lBRUQseUJBQVEsR0FBUjtRQUNJLElBQUksV0FBVyxHQUFHLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQztRQUM3QixJQUFJLFVBQVUsR0FBRyxXQUFXLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQztRQUM3QyxJQUFJLENBQUMsUUFBUSxHQUFHLFdBQVcsQ0FBQztRQUM1QixJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxVQUFTLElBQUk7WUFDNUIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxVQUFVLEdBQUcsR0FBRyxDQUFDLENBQUM7WUFDaEMsSUFBSSxDQUFDLG1CQUFtQixFQUFFLENBQUM7UUFDL0IsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBQ0wsYUFBQztBQUFELENBQUMsQUExQkQsSUEwQkM7QUFHRDtJQVlJLGNBQVksYUFBbUM7UUFWL0MsTUFBQyxHQUFHLENBQUMsQ0FBQztRQUNOLE1BQUMsR0FBRyxDQUFDLENBQUM7UUFDTixVQUFLLEdBQUcsQ0FBQyxDQUFDO1FBQ1YsV0FBTSxHQUFHLENBQUMsQ0FBQztRQUNYLGFBQVEsR0FBRyxDQUFDLENBQUM7UUFDYixXQUFNLEdBQUcsQ0FBQyxDQUFDO1FBQ1gsV0FBTSxHQUFHLENBQUMsQ0FBQztRQUtQLElBQUksQ0FBQyxhQUFhLEdBQUcsYUFBYSxDQUFDO1FBQ25DLElBQUksQ0FBQyxDQUFDLEdBQUcsYUFBYSxDQUFDLENBQUMsQ0FBQztRQUN6QixJQUFJLENBQUMsQ0FBQyxHQUFHLGFBQWEsQ0FBQyxDQUFDLENBQUM7UUFDekIsSUFBSSxDQUFDLFFBQVEsR0FBRyxhQUFhLENBQUMsUUFBUSxDQUFDO1FBQ3ZDLElBQUksQ0FBQyxNQUFNLEdBQUcsYUFBYSxDQUFDLE1BQU0sQ0FBQztRQUNuQyxJQUFJLENBQUMsTUFBTSxHQUFHLGFBQWEsQ0FBQyxNQUFNLENBQUM7SUFDdkMsQ0FBQztJQUVNLHVCQUFRLEdBQWYsVUFBZ0IsVUFBVTtJQUUxQixDQUFDO0lBRU0sa0NBQW1CLEdBQTFCO1FBQ00sZ0JBQWdCO1FBQ2xCLElBQUksYUFBYSxHQUF3QixJQUFJLENBQUMsYUFBYSxDQUFDO1FBQzVELGFBQWEsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQztRQUN6QixhQUFhLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUM7UUFDekIsYUFBYSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDO1FBQ3ZDLGFBQWEsQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQztRQUNuQyxhQUFhLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUM7SUFDdkMsQ0FBQztJQUVMLFdBQUM7QUFBRCxDQUFDLEFBbkNELElBbUNDIn0=