var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var canvas = document.getElementById("game");
var context = canvas.getContext("2d");
var render;
(function (render) {
    /**
     * 基类，负责处理x,y,rotation 等属性
     */
    var DisplayObject = (function () {
        function DisplayObject() {
            this.x = 0;
            this.y = 0;
            this.scaleX = 1;
            this.scaleY = 1;
            this.rotation = 0;
            this.globalMatrix = new render.Matrix();
        }
        DisplayObject.prototype.draw = function (context) {
            var parent = this.parent;
            var angle = this.rotation / 180 * Math.PI;
            var skewX = angle;
            var skewY = angle;
            var localMatrix = new render.Matrix();
            localMatrix.updateFromDisplayObject(this.x, this.y, this.scaleX, this.scaleY, this.rotation);
            if (!parent) {
                this.globalMatrix = localMatrix;
            }
            else {
                //TODO:
                // GLOBAL_MATRIX = PARENT_GLOBAL_MATRIX * LOCAL_MATRIX
                this.globalMatrix = localMatrix;
            }
            context.setTransform(this.globalMatrix.a, this.globalMatrix.b, this.globalMatrix.c, this.globalMatrix.d, this.globalMatrix.tx, this.globalMatrix.ty);
            this.render(context);
        };
        DisplayObject.prototype.render = function (context) {
        };
        return DisplayObject;
    }());
    render.DisplayObject = DisplayObject;
    var DisplayObjectContainer = (function (_super) {
        __extends(DisplayObjectContainer, _super);
        function DisplayObjectContainer() {
            _super.call(this);
            this.children = [];
        }
        DisplayObjectContainer.prototype.addChild = function (child) {
            this.children.push(child);
            child.parent = this;
        };
        DisplayObjectContainer.prototype.render = function (context) {
            for (var i = 0; i < this.children.length; i++) {
                var child = this.children[i];
                child.draw(context);
            }
        };
        return DisplayObjectContainer;
    }(DisplayObject));
    render.DisplayObjectContainer = DisplayObjectContainer;
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
    render.Bitmap = Bitmap;
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
        RenderCore.prototype.start = function (stage, resourceList) {
            if (resourceList === void 0) { resourceList = []; }
            stage.parent = null;
            this.stage = stage;
            var self = this;
            loadResource(resourceList, function () {
                requestAnimationFrame(self.onEnterFrame.bind(self));
            });
        };
        RenderCore.prototype.onEnterFrame = function () {
            context.save();
            context.clearRect(0, 0, canvas.width, canvas.height);
            this.drawQueue(this.stage);
            context.restore();
            requestAnimationFrame(this.onEnterFrame.bind(this));
        };
        RenderCore.prototype.drawQueue = function (stage) {
            stage.draw(context);
        };
        return RenderCore;
    }());
    render.RenderCore = RenderCore;
})(render || (render = {}));
//# sourceMappingURL=renderer.js.map