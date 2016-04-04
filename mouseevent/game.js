var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var humanContainer = new render.DisplayObjectContainer();
var head = new render.Bitmap();
head.source = "wander-icon.jpg";
humanContainer.addChild(head);
humanContainer.x = humanContainer.y = 50;
humanContainer.rotation = 15;
head.rotation = 75;
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
    }
    HumanBody.prototype.onTicker = function (duringTime) {
        // this.x =  100;
        // this.y = 100;
        // this.rotation = 30;
    };
    return HumanBody;
}(Body));
var ticker = new Ticker();
var body = new HumanBody(humanContainer);
// ticker.start([body]);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2FtZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImdhbWUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFLQSxJQUFJLGNBQWMsR0FBRyxJQUFJLE1BQU0sQ0FBQyxzQkFBc0IsRUFBRSxDQUFDO0FBQ3pELElBQUksSUFBSSxHQUFHLElBQUksTUFBTSxDQUFDLE1BQU0sRUFBRSxDQUFDO0FBQy9CLElBQUksQ0FBQyxNQUFNLEdBQUcsaUJBQWlCLENBQUM7QUFDaEMsY0FBYyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUc5QixjQUFjLENBQUMsQ0FBQyxHQUFHLGNBQWMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDO0FBQ3pDLGNBQWMsQ0FBQyxRQUFRLEdBQUcsRUFBRSxDQUFDO0FBRTdCLElBQUksQ0FBQyxRQUFRLEdBQUcsRUFBRSxDQUFBO0FBSWxCLElBQUksVUFBVSxHQUFHLElBQUksTUFBTSxDQUFDLFVBQVUsRUFBRSxDQUFDO0FBQ3pDLFVBQVUsQ0FBQyxLQUFLLENBQUMsY0FBYyxFQUFFLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxDQUFDO0FBR3RELElBQU8sTUFBTSxDQVlaO0FBWkQsV0FBTyxNQUFNLEVBQUMsQ0FBQztJQUVYO1FBQStCLDZCQUFhO1FBQTVDO1lBQStCLDhCQUFhO1FBQUMsQ0FBQztRQUFELGdCQUFDO0lBQUQsQ0FBQyxBQUE5QyxDQUErQixvQkFBYSxHQUFFO0lBQWpDLGdCQUFTLFlBQXdCLENBQUE7QUFVbEQsQ0FBQyxFQVpNLE1BQU0sS0FBTixNQUFNLFFBWVo7QUFJRDtJQUF3Qiw2QkFBSTtJQUE1QjtRQUF3Qiw4QkFBSTtJQVU1QixDQUFDO0lBUEcsNEJBQVEsR0FBUixVQUFTLFVBQWtCO1FBRXZCLGlCQUFpQjtRQUNqQixnQkFBZ0I7UUFDaEIsc0JBQXNCO0lBRTFCLENBQUM7SUFDTCxnQkFBQztBQUFELENBQUMsQUFWRCxDQUF3QixJQUFJLEdBVTNCO0FBRUQsSUFBSSxNQUFNLEdBQUcsSUFBSSxNQUFNLEVBQUUsQ0FBQztBQUMxQixJQUFJLElBQUksR0FBRyxJQUFJLFNBQVMsQ0FBQyxjQUFjLENBQUMsQ0FBQztBQUN6Qyx3QkFBd0IifQ==