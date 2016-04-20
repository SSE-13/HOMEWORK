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
            this._width = 100;
            this._height = 100;
            this.x = 0;
            this.y = 0;
            this.scaleX = 1;
            this.scaleY = 1;
            this.rotation = 0;
            this.globalMatrix = new math.Matrix();
        }
        Object.defineProperty(DisplayObject.prototype, "width", {
            get: function () {
                return this._width;
            },
            set: function (value) {
                this._width = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DisplayObject.prototype, "height", {
            get: function () {
                return this._height;
            },
            set: function (value) {
                this._height = value;
            },
            enumerable: true,
            configurable: true
        });
        DisplayObject.prototype.getLocalMatrix = function () {
            var localMatrix = new math.Matrix();
            localMatrix.updateFromDisplayObject(this.x, this.y, this.scaleX, this.scaleY, this.rotation);
            return localMatrix;
        };
        DisplayObject.prototype.draw = function (context) {
            var parent = this.parent;
            var localMatrix = this.getLocalMatrix();
            if (!parent) {
                this.globalMatrix = localMatrix;
            }
            else {
                //TODO:
                // GLOBAL_MATRIX = PARENT_GLOBAL_MATRIX * LOCAL_MATRIX
                this.globalMatrix = math.matrixAppendMatrix(localMatrix, parent.globalMatrix);
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
            this.color = '#FF0000';
            this.strokeColor = "#000000";
        }
        Rect.prototype.render = function (context) {
            context.fillStyle = this.color;
            context.beginPath();
            context.strokeStyle = this.strokeColor;
            context.rect(0, 0, this.width, this.height);
            context.closePath();
            context.fill();
            context.stroke();
        };
        return Rect;
    }(DisplayObject));
    render.Rect = Rect;
    var TextField = (function (_super) {
        __extends(TextField, _super);
        function TextField() {
            _super.apply(this, arguments);
            this.text = "";
            /**
             * 这个"center"|"left"表示这个变量的类型是字符串，并且只允许是 center 或者 left，其他参数都会编译失败
             */
            this.textAlign = "left";
            /**
             * 字体大小
             */
            this.fontSize = 20;
        }
        TextField.prototype.render = function (context) {
            context.font = this.fontSize + "px Arial";
            context.fillStyle = '#000000';
            context.textAlign = this.textAlign;
            //实现居中功能
            var offsetx = this.textAlign == "center" ? this.width / 2 : 0;
            context.fillText(this.text, offsetx, this.fontSize, this.width);
        };
        return TextField;
    }(DisplayObject));
    render.TextField = TextField;
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
