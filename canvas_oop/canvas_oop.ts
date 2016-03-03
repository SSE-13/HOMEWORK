class DisplayObject {


    draw(context: CanvasRenderingContext2D) {

    }

}

class Bitmap extends DisplayObject {


    draw(context: CanvasRenderingContext2D) {


        var image = new Image();
        image.src = "wander-icon.jpg";
        image.onload = function() {
            context.save();
            context.translate(0, 100);
            context.drawImage(image, 0, 0);
            context.restore();
        }
    }

}

class Rect extends DisplayObject {

    draw(context: CanvasRenderingContext2D) {
        context.save();
        context.fillStyle = '#FF0000';
        context.fillRect(0, 0, 100, 100);
        context.restore();
    }
}

class TextField extends DisplayObject {

    draw(context: CanvasRenderingContext2D) {
        context.save();
        context.font = "20px Arial";
        context.rotate(Math.PI / 4);
        context.fillStyle = '#FFFFFF';
        context.fillText('HelloWorld', 0, 20);
        context.restore();
    }

}

function drawQueue(queue) {
    for (var i = 0; i < renderQueue.length; i++) {
        var displayObject: DisplayObject = renderQueue[i];
        displayObject.draw(context);
    }
}


var canvas: HTMLCanvasElement = document.getElementById("game") as HTMLCanvasElement;
var context = canvas.getContext("2d");
var renderQueue = [new Bitmap(), new Rect(), new TextField()];
drawQueue(renderQueue);

