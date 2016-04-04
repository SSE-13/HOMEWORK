var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var humanContainer = new render.DisplayObjectContainer();
var head = new render.Bitmap();
head.x = 100;
head.source = "wander-icon.jpg";
humanContainer.addChild(head);
var renderCore = new render.RenderCore();
renderCore.start(humanContainer, ["wander-icon.jpg"]);
var HumanBody = (function (_super) {
    __extends(HumanBody, _super);
    function HumanBody() {
        _super.apply(this, arguments);
        this.vx = 5;
    }
    HumanBody.prototype.onTicker = function (duringTime) {
        this.x = 100; //+= duringTime * this.vx;
        this.y = 100;
    };
    return HumanBody;
}(Body));
var ticker = new Ticker();
var body = new HumanBody(humanContainer);
ticker.start([body]);
var eventCore = new events.EventCore();
eventCore.init();
var headHitTest = function (localPoint, displayObject) {
    alert("\u70B9\u51FB\u4F4D\u7F6E\u4E3A" + localPoint.x + "," + localPoint.y);
    return true;
};
var headOnClick = function () {
    body.rotation = 30;
    alert("clicked!!");
    //修改 HumanBody 的速度，使其反向移动
};
eventCore.register(head, headHitTest, headOnClick);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2FtZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImdhbWUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFDQSxJQUFJLGNBQWMsR0FBRyxJQUFJLE1BQU0sQ0FBQyxzQkFBc0IsRUFBRSxDQUFDO0FBQ3pELElBQUksSUFBSSxHQUFHLElBQUksTUFBTSxDQUFDLE1BQU0sRUFBRSxDQUFDO0FBQy9CLElBQUksQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDO0FBQ2IsSUFBSSxDQUFDLE1BQU0sR0FBRyxpQkFBaUIsQ0FBQztBQUNoQyxjQUFjLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO0FBRzlCLElBQUksVUFBVSxHQUFHLElBQUksTUFBTSxDQUFDLFVBQVUsRUFBRSxDQUFDO0FBQ3pDLFVBQVUsQ0FBQyxLQUFLLENBQUMsY0FBYyxFQUFFLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxDQUFDO0FBRXREO0lBQXdCLDZCQUFJO0lBQTVCO1FBQXdCLDhCQUFJO1FBR3hCLE9BQUUsR0FBVSxDQUFDLENBQUM7SUFRbEIsQ0FBQztJQUxHLDRCQUFRLEdBQVIsVUFBUyxVQUFrQjtRQUN2QixJQUFJLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFBLDBCQUEwQjtRQUN2QyxJQUFJLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQztJQUVqQixDQUFDO0lBQ0wsZ0JBQUM7QUFBRCxDQUFDLEFBWEQsQ0FBd0IsSUFBSSxHQVczQjtBQUVELElBQUksTUFBTSxHQUFHLElBQUksTUFBTSxFQUFFLENBQUM7QUFDMUIsSUFBSSxJQUFJLEdBQUcsSUFBSSxTQUFTLENBQUMsY0FBYyxDQUFDLENBQUM7QUFDekMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7QUFHckIsSUFBSSxTQUFTLEdBQUcsSUFBSSxNQUFNLENBQUMsU0FBUyxFQUFFLENBQUM7QUFDdkMsU0FBUyxDQUFDLElBQUksRUFBRSxDQUFDO0FBRWpCLElBQUksV0FBVyxHQUFHLFVBQUMsVUFBcUIsRUFBQyxhQUFrQztJQUN2RSxLQUFLLENBQUUsbUNBQVEsVUFBVSxDQUFDLENBQUMsU0FBSSxVQUFVLENBQUMsQ0FBRyxDQUFDLENBQUM7SUFDL0MsTUFBTSxDQUFDLElBQUksQ0FBQztBQUNoQixDQUFDLENBQUE7QUFFRCxJQUFJLFdBQVcsR0FBRztJQUNkLElBQUksQ0FBQyxRQUFRLEdBQUcsRUFBRSxDQUFDO0lBQ25CLEtBQUssQ0FBQyxXQUFXLENBQUMsQ0FBQztJQUNuQix5QkFBeUI7QUFDN0IsQ0FBQyxDQUFBO0FBRUQsU0FBUyxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUMsV0FBVyxFQUFDLFdBQVcsQ0FBQyxDQUFDIn0=