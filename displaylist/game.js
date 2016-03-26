var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var container = new render.DisplayObjectContainer();
// container.x = 100;
var bitmap = new render.Bitmap();
bitmap.source = "wander-icon.jpg";
var bitmap2 = new render.Bitmap();
bitmap2.source = "wander-icon.jpg";
bitmap2.x = -50;
bitmap2.y = -50;
// container.addChild(bitmap)
container.addChild(bitmap2);
var renderCore = new render.RenderCore();
renderCore.start(container, ["wander-icon.jpg"]);
var HumanBody = (function (_super) {
    __extends(HumanBody, _super);
    function HumanBody() {
        _super.apply(this, arguments);
    }
    HumanBody.prototype.onTicker = function (duringTime) {
        // this.x += 1;
        this.x = this.y = 100;
        this.rotation += 1;
    };
    return HumanBody;
}(Body));
var ticker = new Ticker();
var body = new HumanBody(container);
ticker.start([body]);
//# sourceMappingURL=game.js.map