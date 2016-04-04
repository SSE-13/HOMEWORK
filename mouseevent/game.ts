
var humanContainer = new render.DisplayObjectContainer();
var head = new render.Bitmap();
head.source = "wander-icon.jpg";
humanContainer.addChild(head);


var renderCore = new render.RenderCore();
renderCore.start(humanContainer, ["wander-icon.jpg"]);

class HumanBody extends Body {
    
    
    vx:number = 5;

    onTicker(duringTime: number) {
        this.x += duringTime * this.vx;
        this.y = 100;
        this.rotation = 30;

    }
}

var ticker = new Ticker();
var body = new HumanBody(humanContainer);
ticker.start([body]);


var eventCore = new events.EventCore();
eventCore.init();

var humanHitTest = (localPoint:math.Point,displayObject:render.DisplayObject) =>{
    console.log (localPoint);
    alert (`点击位置为${localPoint.x},${localPoint.y}`);
    return true;
}

var humanOnClick = () => {
    
    alert("clicked!!");
    //修改 HumanBody 的速度，使其反向移动
}

eventCore.register(humanContainer,humanHitTest,humanOnClick);










