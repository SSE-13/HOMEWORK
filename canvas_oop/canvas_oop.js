var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var DisplayObject = (function () {
    function DisplayObject() {
        this.x = 0;
        this.y = 0;
        this.rotate = 0;
    }
    DisplayObject.prototype.draw = function (context) {
        context.save();
        context.rotate(this.rotate);
        context.translate(this.x, this.y);
        this.render(context);
        context.restore();
    };
    DisplayObject.prototype.render = function (context) {
    };
    return DisplayObject;
}());
cla;
ss;
Bitmap;
DisplayObject;
{
    render(context, CanvasRenderingContext2D);
    {
        var image = new Image();
        image.src = "wander-icon.jpg";
        image.onload = function () {
            // context.save();
            // context.translate(0, 100);
            context.drawImage(image, 0, 0);
            // context.restore();
        };
    }
}
var Rect = (function (_super) {
    __extends(Rect, _super);
    function Rect() {
        _super.apply(this, arguments);
        this.width = 100;
        this.height = 100;
        this.color = '#FF0000';
    }
    Rect.prototype.render = function (context) {
        context.fillStyle = this.color;
        context.fillRect(0, 0, this.width, this.height);
    };
    return Rect;
}(DisplayObject));
var TextField = (function (_super) {
    __extends(TextField, _super);
    function TextField() {
        _super.apply(this, arguments);
    }
    TextField.prototype.render = function (context) {
        context.font = "20px Arial";
        // context.rotate(Math.PI / 4);
        context.fillStyle = '#000000';
        context.fillText('HelloWorld', 0, 20);
    };
    return TextField;
}(DisplayObject));
function drawQueue(queue) {
    for (var i = 0; i < renderQueue.length; i++) {
        var displayObject = renderQueue[i];
        displayObject.draw(context);
    }
}
var canvas = document.getElementById("game");
var context = canvas.getContext("2d");
var rect = new Rect();
rect.width = 200;
rect.height = 100;
rect.color = '#00FF00';
var rect2 = new Rect();
rect2.width = 300;
rect2.height = 50;
rect2.x = 200;
rect2.y = 200;
rect2.rotate = Math.PI / 8;
rect2.color = '#00FFFF';
var text = new TextField();
text.x = 50;
var renderQueue = [rect, rect2, text];
drawQueue(renderQueue);
