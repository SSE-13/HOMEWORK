class DisplayObject {

    x = 0;

    y = 0;
    
    rotate = 0;

    draw(context: CanvasRenderingContext2D) {
          context.save();
      context.rotate(this.rotate);
        context.translate(this.x, this.y);
        this.render(context);

        context.restore();
    }
    
    render(context:CanvasRenderingContext2D){
        
    }

}

class Bitmap extends DisplayObject {


    render(context: CanvasRenderingContext2D) {


        var image = new Image();
        image.src = "wander-icon.jpg";
        image.onload = function() {
            // context.save();
            // context.translate(0, 100);
            context.drawImage(image, 0, 0);
            // context.restore();
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
        // context.rotate(Math.PI / 4);
        context.fillStyle = '#000000';
        context.fillText('HelloWorld', 0, 20);

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


var rect = new Rect();
rect.width = 200;
rect.height = 100;
rect.color = '#00FF00'


var rect2 = new Rect();
rect2.width = 300;
rect2.height = 50;
rect2.x = 200;
rect2.y = 200;
rect2.rotate = Math.PI / 8;
rect2.color = '#00FFFF'

var text = new TextField();
text.x = 10;

var renderQueue = [ rect, rect2, text];
drawQueue(renderQueue);

