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
            this.globalMatrix = new math.Matrix();
        }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVuZGVyZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJyZW5kZXJlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLElBQUksTUFBTSxHQUFzQixRQUFRLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBc0IsQ0FBQztBQUNyRixJQUFJLE9BQU8sR0FBRyxNQUFNLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDO0FBR3RDLElBQU8sTUFBTSxDQXdNWjtBQXhNRCxXQUFPLE1BQU0sRUFBQyxDQUFDO0lBTVg7O09BRUc7SUFDSDtRQWVJO1lBYkEsTUFBQyxHQUFHLENBQUMsQ0FBQztZQUNOLE1BQUMsR0FBRyxDQUFDLENBQUM7WUFDTixXQUFNLEdBQUcsQ0FBQyxDQUFDO1lBQ1gsV0FBTSxHQUFHLENBQUMsQ0FBQztZQUNYLGFBQVEsR0FBRyxDQUFDLENBQUM7WUFVVCxJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO1FBQzFDLENBQUM7UUFFRCxzQ0FBYyxHQUFkO1lBQ0ksSUFBSSxXQUFXLEdBQUcsSUFBSSxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7WUFDcEMsV0FBVyxDQUFDLHVCQUF1QixDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQzdGLE1BQU0sQ0FBQyxXQUFXLENBQUM7UUFDdkIsQ0FBQztRQUVELDRCQUFJLEdBQUosVUFBSyxPQUFpQztZQUVsQyxJQUFJLE1BQU0sR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDO1lBQ3pCLElBQUksV0FBVyxHQUFHLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztZQUN4QyxFQUFFLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7Z0JBQ1YsSUFBSSxDQUFDLFlBQVksR0FBRyxXQUFXLENBQUM7WUFDcEMsQ0FBQztZQUNELElBQUksQ0FBQyxDQUFDO2dCQUNGLE9BQU87Z0JBQ1Asc0RBQXNEO2dCQUN0RCxJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxXQUFXLEVBQUUsTUFBTSxDQUFDLFlBQVksQ0FBQyxDQUFDO1lBQ2xGLENBQUM7WUFHRCxPQUFPLENBQUMsWUFBWSxDQUNoQixJQUFJLENBQUMsWUFBWSxDQUFDLENBQUMsRUFDbkIsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLEVBQ25CLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxFQUNuQixJQUFJLENBQUMsWUFBWSxDQUFDLENBQUMsRUFDbkIsSUFBSSxDQUFDLFlBQVksQ0FBQyxFQUFFLEVBQ3BCLElBQUksQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUN2QixDQUFDO1lBQ0YsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUN6QixDQUFDO1FBRUQsOEJBQU0sR0FBTixVQUFPLE9BQWlDO1FBRXhDLENBQUM7UUFDTCxvQkFBQztJQUFELENBQUMsQUFyREQsSUFxREM7SUFyRFksb0JBQWEsZ0JBcUR6QixDQUFBO0lBRUQsWUFBWTtJQUNaLFNBQVM7SUFDVCw4QkFBOEI7SUFFOUI7UUFBNEMsMENBQWE7UUFLckQ7WUFDSSxpQkFBTyxDQUFDO1lBQ1IsSUFBSSxDQUFDLFFBQVEsR0FBRyxFQUFFLENBQUM7UUFDdkIsQ0FBQztRQUVELHlDQUFRLEdBQVIsVUFBUyxLQUFvQjtZQUN6QixJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUMxQixLQUFLLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztRQUN4QixDQUFDO1FBRUQsdUNBQU0sR0FBTixVQUFPLE9BQU87WUFDVixHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUM7Z0JBQzVDLElBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQzdCLEtBQUssQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDeEIsQ0FBQztRQUNMLENBQUM7UUFDTCw2QkFBQztJQUFELENBQUMsQUFyQkQsQ0FBNEMsYUFBYSxHQXFCeEQ7SUFyQlksNkJBQXNCLHlCQXFCbEMsQ0FBQTtJQUVEO1FBQTRCLDBCQUFhO1FBQXpDO1lBQTRCLDhCQUFhO1FBa0J6QyxDQUFDO1FBYkcsdUJBQU0sR0FBTixVQUFPLE9BQWlDO1lBRXBDLElBQUksS0FBSyxHQUFHLFNBQVMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDbkMsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztnQkFDUixPQUFPLENBQUMsU0FBUyxDQUFDLEtBQUssRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDbkMsQ0FBQztZQUNELElBQUksQ0FBQyxDQUFDO2dCQUNGLE9BQU8sQ0FBQyxJQUFJLEdBQUcsWUFBWSxDQUFDO2dCQUM1QixPQUFPLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQztnQkFDOUIsT0FBTyxDQUFDLFFBQVEsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1lBQ3RDLENBQUM7UUFDTCxDQUFDO1FBRUwsYUFBQztJQUFELENBQUMsQUFsQkQsQ0FBNEIsYUFBYSxHQWtCeEM7SUFsQlksYUFBTSxTQWtCbEIsQ0FBQTtJQUVEO1FBQW1CLHdCQUFhO1FBQWhDO1lBQW1CLDhCQUFhO1lBRTVCLFVBQUssR0FBRyxHQUFHLENBQUE7WUFFWCxXQUFNLEdBQUcsR0FBRyxDQUFDO1lBRWIsVUFBSyxHQUFHLFNBQVMsQ0FBQztRQU10QixDQUFDO1FBSkcscUJBQU0sR0FBTixVQUFPLE9BQWlDO1lBQ3BDLE9BQU8sQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQztZQUMvQixPQUFPLENBQUMsUUFBUSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsSUFBSSxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDcEQsQ0FBQztRQUNMLFdBQUM7SUFBRCxDQUFDLEFBWkQsQ0FBbUIsYUFBYSxHQVkvQjtJQUVEO1FBQXdCLDZCQUFhO1FBQXJDO1lBQXdCLDhCQUFhO1FBT3JDLENBQUM7UUFMRywwQkFBTSxHQUFOLFVBQU8sT0FBaUM7WUFDcEMsT0FBTyxDQUFDLElBQUksR0FBRyxZQUFZLENBQUM7WUFDNUIsT0FBTyxDQUFDLFNBQVMsR0FBRyxTQUFTLENBQUM7WUFDOUIsT0FBTyxDQUFDLFFBQVEsQ0FBQyxZQUFZLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBQzFDLENBQUM7UUFDTCxnQkFBQztJQUFELENBQUMsQUFQRCxDQUF3QixhQUFhLEdBT3BDO0lBSUQsSUFBSSxTQUFTLEdBQUcsRUFBRSxDQUFDO0lBRW5CLHNCQUFzQixTQUFTLEVBQUUsUUFBUTtRQUNyQyxJQUFJLEtBQUssR0FBRyxDQUFDLENBQUM7UUFDZCxFQUFFLENBQUMsQ0FBQyxTQUFTLENBQUMsTUFBTSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDeEIsUUFBUSxFQUFFLENBQUM7WUFDWCxNQUFNLENBQUM7UUFDWCxDQUFDO1FBQ0QsU0FBUyxDQUFDLE9BQU8sQ0FBQyxVQUFTLFFBQVE7WUFDL0IsSUFBSSxLQUFLLEdBQUcsSUFBSSxLQUFLLEVBQUUsQ0FBQztZQUN4QixLQUFLLENBQUMsR0FBRyxHQUFHLFFBQVEsQ0FBQztZQUNyQixLQUFLLENBQUMsTUFBTSxHQUFHLGNBQWMsQ0FBQztZQUM5QixLQUFLLENBQUMsT0FBTyxHQUFHLFdBQVcsQ0FBQztZQUU1QjtnQkFDSSxTQUFTLENBQUMsUUFBUSxDQUFDLEdBQUcsS0FBSyxDQUFDO2dCQUM1QixLQUFLLEVBQUUsQ0FBQztnQkFDUixFQUFFLENBQUMsQ0FBQyxLQUFLLElBQUksU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7b0JBQzVCLFFBQVEsRUFBRSxDQUFDO2dCQUNmLENBQUM7WUFDTCxDQUFDO1lBRUQ7Z0JBQ0ksS0FBSyxDQUFDLFNBQVMsR0FBRyxRQUFRLENBQUMsQ0FBQztZQUNoQyxDQUFDO1FBQ0wsQ0FBQyxDQUFDLENBQUE7SUFDTixDQUFDO0lBSUQ7O09BRUc7SUFDSDtRQUFBO1FBOEJBLENBQUM7UUEzQkc7Ozs7V0FJRztRQUNILDBCQUFLLEdBQUwsVUFBTSxLQUFvQixFQUFFLFlBQWlCO1lBQWpCLDRCQUFpQixHQUFqQixpQkFBaUI7WUFDekMsS0FBSyxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7WUFDcEIsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7WUFDbkIsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDO1lBQ2hCLFlBQVksQ0FBQyxZQUFZLEVBQUU7Z0JBQ3ZCLHFCQUFxQixDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7WUFDeEQsQ0FBQyxDQUFDLENBQUE7UUFFTixDQUFDO1FBRUQsaUNBQVksR0FBWjtZQUNJLE9BQU8sQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUNmLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxNQUFNLENBQUMsS0FBSyxFQUFFLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUNyRCxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUMzQixPQUFPLENBQUMsT0FBTyxFQUFFLENBQUM7WUFDbEIscUJBQXFCLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztRQUN4RCxDQUFDO1FBRUQsOEJBQVMsR0FBVCxVQUFVLEtBQW9CO1lBQzFCLEtBQUssQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDeEIsQ0FBQztRQUVMLGlCQUFDO0lBQUQsQ0FBQyxBQTlCRCxJQThCQztJQTlCWSxpQkFBVSxhQThCdEIsQ0FBQTtBQUNMLENBQUMsRUF4TU0sTUFBTSxLQUFOLE1BQU0sUUF3TVoifQ==