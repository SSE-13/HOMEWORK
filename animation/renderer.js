var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var canvas = document.getElementById("game");
var context = canvas.getContext("2d");
/**
 * 基类，负责处理x,y,rotation 等属性
 */
var DisplayObject = (function () {
    function DisplayObject() {
        this.x = 0;
        this.y = 0;
        this.rotation = 0;
    }
    DisplayObject.prototype.draw = function (context) {
        context.save();
        context.rotate(this.rotation);
        context.translate(this.x, this.y);
        this.render(context);
        context.restore();
    };
    DisplayObject.prototype.render = function (context) {
    };
    return DisplayObject;
}());
var Bitmap = (function (_super) {
    __extends(Bitmap, _super);
    function Bitmap() {
        _super.apply(this, arguments);
    }
    Bitmap.prototype.render = function (context) {
        var image = imagePool[this.source];
        if (image) {
            context.drawImage(image, 0, 0);
        }
        else {
            context.font = "20px Arial";
            context.fillStyle = '#000000';
            context.fillText('错误的URL', 0, 20);
        }
    };
    return Bitmap;
}(DisplayObject));
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
        context.fillStyle = '#000000';
        context.fillText('HelloWorld', 0, 20);
    };
    return TextField;
}(DisplayObject));
var imagePool = {};
function loadResource(imageList, callback) {
    var count = 0;
    if (imageList.length == 0) {
        callback();
        return;
    }
    imageList.forEach(function (imageUrl) {
        var image = new Image();
        image.src = imageUrl;
        image.onload = onLoadComplete;
        image.onerror = onLoadError;
        function onLoadComplete() {
            imagePool[imageUrl] = image;
            count++;
            if (count == imageList.length) {
                callback();
            }
        }
        function onLoadError() {
            alert('资源加载失败:' + imageUrl);
        }
    });
}
/**
 * 渲染核心
 */
var RenderCore = (function () {
    function RenderCore() {
    }
    /**
     * 启动渲染核心
     * @param renderQueue 渲染队列
     * @param imageList 资源列表
     */
    RenderCore.prototype.start = function (renderQueue, resourceList) {
        if (renderQueue === void 0) { renderQueue = []; }
        if (resourceList === void 0) { resourceList = []; }
        this.renderQueue = renderQueue;
        var self = this;
        loadResource(resourceList, function () {
            requestAnimationFrame(self.onEnterFrame.bind(self));
        });
    };
    RenderCore.prototype.onEnterFrame = function () {
        context.clearRect(0, 0, canvas.width, canvas.height);
        this.drawQueue(this.renderQueue);
        requestAnimationFrame(this.onEnterFrame.bind(this));
    };
    RenderCore.prototype.drawQueue = function (queue) {
        for (var i = 0; i < this.renderQueue.length; i++) {
            var displayObject = this.renderQueue[i];
            displayObject.draw(context);
        }
    };
    return RenderCore;
}());
