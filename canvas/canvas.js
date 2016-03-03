var canvas = document.getElementById("game");
var context = canvas.getContext("2d");
drawRect();
drawText();
drawImage();
function drawRect() {
    context.save();
    context.fillStyle = '#FF0000';
    context.fillRect(0, 0, 100, 100);
    context.restore();
}
function drawText() {
    context.save();
    context.font = "20px Arial";
    context.rotate(Math.PI / 4);
    context.fillStyle = '#0000FF';
    context.fillText('HelloWorld', 0, 20);
    context.restore();
}
function drawImage() {
    var image = new Image();
    image.src = "wander-icon.jpg";
    // return;
    image.onload = function () {
        context.save();
        context.translate(0, 100);
        context.drawImage(image, 0, 0);
        context.restore();
    };
}
