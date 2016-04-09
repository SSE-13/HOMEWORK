var canvas = document.getElementById("game");
var context = canvas.getContext("2d");
var render;
(function (render) {
    /**
     * 基类，负责处理x,y,rotation 等属性
     */
    class DisplayObject {
        constructor() {
            this.width = 100;
            this.height = 100;
            this.x = 0;
            this.y = 0;
            this.scaleX = 1;
            this.scaleY = 1;
            this.rotation = 0;
            this.globalMatrix = new math.Matrix();
        }
        getLocalMatrix() {
            var localMatrix = new math.Matrix();
            localMatrix.updateFromDisplayObject(this.x, this.y, this.scaleX, this.scaleY, this.rotation);
            return localMatrix;
        }
        draw(context) {
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
        }
        render(context) {
        }
    }
    render.DisplayObject = DisplayObject;
    class DisplayObjectContainer extends DisplayObject {
        constructor() {
            super();
            this.children = [];
        }
        addChild(child) {
            this.children.push(child);
            child.parent = this;
        }
        render(context) {
            for (var i = 0; i < this.children.length; i++) {
                var child = this.children[i];
                child.draw(context);
            }
        }
    }
    render.DisplayObjectContainer = DisplayObjectContainer;
    class Bitmap extends DisplayObject {
        render(context) {
            var image = imagePool[this.source];
            if (image) {
                context.drawImage(image, 0, 0);
            }
            else {
                context.font = "20px Arial";
                context.fillStyle = '#000000';
                context.fillText('错误的URL', 0, 20);
            }
        }
    }
    render.Bitmap = Bitmap;
    class Rect extends DisplayObject {
        constructor(...args) {
            super(...args);
            this.color = '#FF0000';
            this.strokeColor = "#000000";
        }
        render(context) {
            context.fillStyle = this.color;
            context.beginPath();
            context.strokeStyle = this.strokeColor;
            context.rect(0, 0, this.width, this.height);
            context.closePath();
            context.fill();
            context.stroke();
        }
    }
    render.Rect = Rect;
    class TextField extends DisplayObject {
        render(context) {
            context.font = "20px Arial";
            context.fillStyle = '#000000';
            context.fillText('HelloWorld', 0, 20);
        }
    }
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
    class RenderCore {
        /**
         * 启动渲染核心
         * @param renderQueue 渲染队列
         * @param imageList 资源列表
         */
        start(stage, resourceList = []) {
            stage.parent = null;
            this.stage = stage;
            var self = this;
            loadResource(resourceList, function () {
                requestAnimationFrame(self.onEnterFrame.bind(self));
            });
        }
        onEnterFrame() {
            context.save();
            context.clearRect(0, 0, canvas.width, canvas.height);
            this.drawQueue(this.stage);
            context.restore();
            requestAnimationFrame(this.onEnterFrame.bind(this));
        }
        drawQueue(stage) {
            stage.draw(context);
        }
    }
    render.RenderCore = RenderCore;
})(render || (render = {}));
