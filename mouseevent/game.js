var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var humanContainer = new render.DisplayObjectContainer();
var head = new render.Bitmap();
head.source = "wander-icon.jpg";
humanContainer.addChild(head);
var renderCore = new render.RenderCore();
renderCore.start(humanContainer, ["wander-icon.jpg"]);
var render;
(function (render) {
    var TextField = (function (_super) {
        __extends(TextField, _super);
        function TextField() {
            _super.apply(this, arguments);
        }
        return TextField;
    }(render.DisplayObject));
    render.TextField = TextField;
})(render || (render = {}));
var HumanBody = (function (_super) {
    __extends(HumanBody, _super);
    function HumanBody() {
        _super.apply(this, arguments);
        this.vx = 5;
    }
    HumanBody.prototype.onTicker = function (duringTime) {
        this.x += duringTime * this.vx;
        this.y = 100;
        this.rotation = 30;
    };
    return HumanBody;
}(Body));
var ticker = new Ticker();
var body = new HumanBody(humanContainer);
ticker.start([body]);
var eventCore = new events.EventCore();
eventCore.init();
var humanHitTest = function (localPoint, displayObject) {
    console.log(localPoint);
    alert("\u70B9\u51FB\u4F4D\u7F6E\u4E3A" + localPoint.x + "," + localPoint.y);
    return true;
};
var humanOnClick = function () {
    alert("clicked!!");
    //修改 HumanBody 的速度，使其反向移动
};
eventCore.register(humanContainer, humanHitTest, humanOnClick);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2FtZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImdhbWUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFLQSxJQUFJLGNBQWMsR0FBRyxJQUFJLE1BQU0sQ0FBQyxzQkFBc0IsRUFBRSxDQUFDO0FBQ3pELElBQUksSUFBSSxHQUFHLElBQUksTUFBTSxDQUFDLE1BQU0sRUFBRSxDQUFDO0FBQy9CLElBQUksQ0FBQyxNQUFNLEdBQUcsaUJBQWlCLENBQUM7QUFDaEMsY0FBYyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUc5QixJQUFJLFVBQVUsR0FBRyxJQUFJLE1BQU0sQ0FBQyxVQUFVLEVBQUUsQ0FBQztBQUN6QyxVQUFVLENBQUMsS0FBSyxDQUFDLGNBQWMsRUFBRSxDQUFDLGlCQUFpQixDQUFDLENBQUMsQ0FBQztBQUd0RCxJQUFPLE1BQU0sQ0FZWjtBQVpELFdBQU8sTUFBTSxFQUFDLENBQUM7SUFFWDtRQUErQiw2QkFBYTtRQUE1QztZQUErQiw4QkFBYTtRQUFDLENBQUM7UUFBRCxnQkFBQztJQUFELENBQUMsQUFBOUMsQ0FBK0Isb0JBQWEsR0FBRTtJQUFqQyxnQkFBUyxZQUF3QixDQUFBO0FBVWxELENBQUMsRUFaTSxNQUFNLEtBQU4sTUFBTSxRQVlaO0FBSUQ7SUFBd0IsNkJBQUk7SUFBNUI7UUFBd0IsOEJBQUk7UUFHeEIsT0FBRSxHQUFVLENBQUMsQ0FBQztJQVFsQixDQUFDO0lBTkcsNEJBQVEsR0FBUixVQUFTLFVBQWtCO1FBQ3ZCLElBQUksQ0FBQyxDQUFDLElBQUksVUFBVSxHQUFHLElBQUksQ0FBQyxFQUFFLENBQUM7UUFDL0IsSUFBSSxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUM7UUFDYixJQUFJLENBQUMsUUFBUSxHQUFHLEVBQUUsQ0FBQztJQUV2QixDQUFDO0lBQ0wsZ0JBQUM7QUFBRCxDQUFDLEFBWEQsQ0FBd0IsSUFBSSxHQVczQjtBQUVELElBQUksTUFBTSxHQUFHLElBQUksTUFBTSxFQUFFLENBQUM7QUFDMUIsSUFBSSxJQUFJLEdBQUcsSUFBSSxTQUFTLENBQUMsY0FBYyxDQUFDLENBQUM7QUFDekMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7QUFHckIsSUFBSSxTQUFTLEdBQUcsSUFBSSxNQUFNLENBQUMsU0FBUyxFQUFFLENBQUM7QUFDdkMsU0FBUyxDQUFDLElBQUksRUFBRSxDQUFDO0FBRWpCLElBQUksWUFBWSxHQUFHLFVBQUMsVUFBcUIsRUFBQyxhQUFrQztJQUN4RSxPQUFPLENBQUMsR0FBRyxDQUFFLFVBQVUsQ0FBQyxDQUFDO0lBQ3pCLEtBQUssQ0FBRSxtQ0FBUSxVQUFVLENBQUMsQ0FBQyxTQUFJLFVBQVUsQ0FBQyxDQUFHLENBQUMsQ0FBQztJQUMvQyxNQUFNLENBQUMsSUFBSSxDQUFDO0FBQ2hCLENBQUMsQ0FBQTtBQUVELElBQUksWUFBWSxHQUFHO0lBRWYsS0FBSyxDQUFDLFdBQVcsQ0FBQyxDQUFDO0lBQ25CLHlCQUF5QjtBQUM3QixDQUFDLENBQUE7QUFFRCxTQUFTLENBQUMsUUFBUSxDQUFDLGNBQWMsRUFBQyxZQUFZLEVBQUMsWUFBWSxDQUFDLENBQUMifQ==