var canvas: HTMLCanvasElement = document.getElementById("game") as HTMLCanvasElement;
var context = canvas.getContext("2d");
/**
 * 基类，负责处理x,y,rotation 等属性
 */
class DisplayObject {

    x = 0;

    y = 0;

    rotation = 0;

    draw(context: CanvasRenderingContext2D) {
        context.save();
        context.rotate(this.rotation);
        context.translate(this.x, this.y);
        this.render(context);

        context.restore();
    }

    render(context: CanvasRenderingContext2D) {

    }

}

class Bitmap extends DisplayObject {


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

class Rect extends DisplayObject {

    width = 100

    height = 100;

    color = '#FF0000';

    render(context: CanvasRenderingContext2D) {
        context.fillStyle = this.color;
        context.fillRect(0, 0, this.width, this.height);
    }
}

class TextField extends DisplayObject {

    render(context: CanvasRenderingContext2D) {
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
    imageList.forEach(function(imageUrl) {
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
class RenderCore {

    renderQueue;
    /**
     * 启动渲染核心
     * @param renderQueue 渲染队列
     * @param imageList 资源列表
     */
    start(renderQueue = [], resourceList = []) {
        this.renderQueue = renderQueue;
        var self = this;
        loadResource(resourceList, function() {
            requestAnimationFrame(self.onEnterFrame.bind(self));
        })

    }

    onEnterFrame() {
        context.clearRect(0, 0, canvas.width, canvas.height);
        this.drawQueue(this.renderQueue);
        requestAnimationFrame(this.onEnterFrame.bind(this));
    }

    drawQueue(queue) {
        for (var i = 0; i < this.renderQueue.length; i++) {
            var displayObject: DisplayObject = this.renderQueue[i];
            displayObject.draw(context);
        }
    }

}