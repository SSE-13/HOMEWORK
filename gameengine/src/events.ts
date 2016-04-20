






module events {


    interface RegisterEventInfo {

        displayObject: render.DisplayObject;

        hitTest: (localPoint: math.Point, displayObject: render.DisplayObject) => Boolean;

        onClick: (displayObject: render.DisplayObject) => void;


    }


    export function displayObjectRectHitTest(localPoint: math.Point, displayObject: render.DisplayObject) {
        return localPoint.x >= 0 && localPoint.x <= displayObject.width && localPoint.y >= 0 && localPoint.y <= displayObject.height;
    }


    export class EventCore {
        
        
        
        private static _instance:EventCore;
        
        public static getInstance():EventCore {
            if (EventCore._instance == null){
                EventCore._instance = new EventCore();
            }
            return EventCore._instance;
        }

        eventInfos: Array<RegisterEventInfo>

        onStageClick = (e: MouseEvent) => {
            //获取舞台坐标
            var stageClickedPoint = new math.Point(e.offsetX, e.offsetY);
            for (var i = 0; i < this.eventInfos.length; i++) {
                var info = this.eventInfos[i];
                var globalMatrix = info.displayObject.globalMatrix;
                var invertGlobalMatrix = math.invertMatrix(globalMatrix);
                var newPoint = math.pointAppendMatrix(stageClickedPoint, invertGlobalMatrix);
                //如果检测返回true，则认为点中了
                if (info.hitTest(newPoint, info.displayObject)) {
                    info.onClick(info.displayObject);
                    break;
                }
            }
        };

        init() {
            this.eventInfos = [];
            var canvas = document.getElementById("game");
            canvas.addEventListener("click", this.onStageClick);
        }


        register(displayObject: render.DisplayObject, hitTest: (localPoint: math.Point, displayObject: render.DisplayObject) => Boolean, onClick: (displayObject: render.DisplayObject) => void) {
            this.eventInfos.push({ displayObject, hitTest, onClick });

        }

    }
}