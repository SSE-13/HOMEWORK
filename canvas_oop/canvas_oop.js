var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var DisplayObject = (function () {
    function DisplayObject() {
    }
    DisplayObject.prototype.draw = function (context) {
    };
    return DisplayObject;
}());
var Bitmap = (function (_super) {
    __extends(Bitmap, _super);
    function Bitmap() {
        _super.apply(this, arguments);
    }
    Bitmap.prototype.draw = function (context) {
        var image = new Image();
        image.src = "wander-icon.jpg";
        image.onload = function () {
            context.save();
            context.translate(0, 100);
            context.drawImage(image, 0, 0);
            context.restore();
        };
    };
    return Bitmap;
}(DisplayObject));
var Rect = (function (_super) {
    __extends(Rect, _super);
    function Rect() {
        _super.apply(this, arguments);
    }
    Rect.prototype.draw = function (context) {
        context.save();
        context.fillStyle = '#FF0000';
        context.fillRect(0, 0, 100, 100);
        context.restore();
    };
    return Rect;
}(DisplayObject));
var TextField = (function (_super) {
    __extends(TextField, _super);
    function TextField() {
        _super.apply(this, arguments);
    }
    TextField.prototype.draw = function (context) {
        context.save();
        context.font = "20px Arial";
        context.rotate(Math.PI / 4);
        context.fillStyle = '#FFFFFF';
        context.fillText('HelloWorld', 0, 20);
        context.restore();
    };
    return TextField;
}(DisplayObject));
var canvas = document.getElementById("game");
var context = canvas.getContext("2d");
var renderList = [];
renderList.push(new Bitmap(), new Rect(), new TextField());
for (var i = 0; i < renderList.length; i++) {
    var displayObject = renderList[i];
    displayObject.draw(context);
}
