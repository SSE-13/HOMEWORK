module game {


}

var humanContainer = new render.DisplayObjectContainer();
var head = new render.Bitmap();
head.source = "wander-icon.jpg";
humanContainer.addChild(head);


var renderCore = new render.RenderCore();
renderCore.start(humanContainer, ["wander-icon.jpg"]);


module render {
    
    export class TextField extends DisplayObject{}
    
    export interface Position {
        
        x:number;
        
        y:number;
        
    }
    
}



class HumanBody extends Body {


    onTicker(duringTime: number) {

        // this.x =  100;
        // this.y = 100;
        // this.rotation = 30;

    }
}

var ticker = new Ticker();
var body = new HumanBody(humanContainer);
// ticker.start([body]);











