var canvas: HTMLCanvasElement = document.getElementById("game") as HTMLCanvasElement;
var context = canvas.getContext("2d");


module render {





    /**
     * 基类，负责处理x,y,rotation 等属性
     */
    export class DisplayObject {

        protected _width = 100
        protected _height = 100;

        public get width(): number {
            return this._width;
        }

        public set width(value: number) {
            this._width = value;
        }

        public get height(): number {
            return this._height;
        }

        public set height(value: number) {
            this._height = value;
        }


        x = 0;
        y = 0;
        scaleX = 1;
        scaleY = 1;
        rotation = 0;

        /**
         * 全局矩阵
         */
        globalMatrix: math.Matrix;

        parent: DisplayObject;

        constructor() {
            this.globalMatrix = new math.Matrix();
        }

        getLocalMatrix(): math.Matrix {
            var localMatrix = new math.Matrix();
            localMatrix.updateFromDisplayObject(this.x, this.y, this.scaleX, this.scaleY, this.rotation);
            return localMatrix;
        }

        draw(context: CanvasRenderingContext2D) {

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


            context.setTransform(
                this.globalMatrix.a,
                this.globalMatrix.b,
                this.globalMatrix.c,
                this.globalMatrix.d,
                this.globalMatrix.tx,
                this.globalMatrix.ty
            );
            this.render(context);
        }

        render(context: CanvasRenderingContext2D) {

        }
    }

    export class DisplayObjectContainer extends DisplayObject {


        children: Array<DisplayObject>

        constructor() {
            super();
            this.children = [];
        }

        addChild(child: DisplayObject) {
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

    export class Bitmap extends DisplayObject {


        source;

        render(context: CanvasRenderingContext2D) {

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

    export class Rect extends DisplayObject {



        color = '#FF0000';

        strokeColor = "#000000"

        render(context: CanvasRenderingContext2D) {
            context.fillStyle = this.color;
            context.beginPath();
            context.strokeStyle = this.strokeColor;
            context.rect(0, 0, this.width, this.height);
            context.closePath();
            context.fill();
            context.stroke();
        }
    }

    export class TextField extends DisplayObject {

        public text: string = "";

        /**
         * 这个"center"|"left"表示这个变量的类型是字符串，并且只允许是 center 或者 left，其他参数都会编译失败
         */
        public textAlign: "center" | "left" = "left";

        /**
         * 字体大小
         */
        public fontSize: number = 20;

        render(context: CanvasRenderingContext2D) {
            context.font = `${this.fontSize}px Arial`;
            context.fillStyle = '#000000';
            context.textAlign = this.textAlign;
            //实现居中功能
            var offsetx = this.textAlign == "center" ? this.width / 2 : 0;
            context.fillText(this.text, offsetx, this.fontSize, this.width);
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
        })
    }



    /**
     * 渲染核心
     */
    export class RenderCore {

        stage;
        /**
         * 启动渲染核心
         * @param renderQueue 渲染队列
         * @param imageList 资源列表
         */
        start(stage: DisplayObject, resourceList = []) {
            stage.parent = null;
            this.stage = stage;
            var self = this;
            loadResource(resourceList, function () {
                requestAnimationFrame(self.onEnterFrame.bind(self));
            })

        }

        onEnterFrame() {
            context.save();
            context.clearRect(0, 0, canvas.width, canvas.height);
            this.drawQueue(this.stage);
            context.restore();
            requestAnimationFrame(this.onEnterFrame.bind(this));
        }

        drawQueue(stage: DisplayObject) {
            stage.draw(context);
        }

    }
}