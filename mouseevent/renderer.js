var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var canvas = document.getElementById("game");
var context = canvas.getContext("2d");
var render;
(function (render) {
    function matrixAppendMatrix(m1, m2) {
        var result = new render.Matrix();
        result.a = m1.a * m2.a + m1.b * m2.c;
        result.b = m1.a * m2.b + m1.b * m2.d;
        result.c = m2.a * m1.c + m2.c * m1.d;
        result.d = m2.b * m1.c + m1.d * m2.d;
        result.tx = m2.a * m1.tx + m2.c * m1.ty + m2.tx;
        result.ty = m2.b * m1.tx + m2.d * m1.ty + m2.ty;
        return result;
    }
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
                this.globalMatrix = matrixAppendMatrix(localMatrix, parent.globalMatrix);
            }
            context.setTransform(this.globalMatrix.a, this.globalMatrix.b, this.globalMatrix.c, this.globalMatrix.d, this.globalMatrix.tx, this.globalMatrix.ty);
            this.render(context);
        };
        DisplayObject.prototype.render = function (context) {
        };
        return DisplayObject;
    }());
    render.DisplayObject = DisplayObject;
    // Container
    //   draw
    //{  context.setTransform()  }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVuZGVyZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJyZW5kZXJlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLElBQUksTUFBTSxHQUFzQixRQUFRLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBc0IsQ0FBQztBQUNyRixJQUFJLE9BQU8sR0FBRyxNQUFNLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDO0FBR3RDLElBQU8sTUFBTSxDQWtOWjtBQWxORCxXQUFPLE1BQU0sRUFBQyxDQUFDO0lBSVgsNEJBQTRCLEVBQVUsRUFBRSxFQUFVO1FBRTlDLElBQUksTUFBTSxHQUFHLElBQUksYUFBTSxFQUFFLENBQUM7UUFDMUIsTUFBTSxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQ3JDLE1BQU0sQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUNyQyxNQUFNLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDckMsTUFBTSxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQ3JDLE1BQU0sQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxDQUFDO1FBQ2hELE1BQU0sQ0FBQyxF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