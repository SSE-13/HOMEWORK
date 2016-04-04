






module events {


    interface RegisterEventInfo {

        displayObject: render.DisplayObject;

        hitTest: (localPoint: math.Point, displayObject: render.DisplayObject) => Boolean;

        onClick: () => void;


    }

    export class EventCore {

        eventInfos: Array<RegisterEventInfo>

        onStageClick = (e: MouseEvent) => {
            //获取舞台坐标
            var stageClickedPoint = new math.Point(e.offsetX, e.offsetY);
            for (var i = 0; i < this.eventInfos.length; i++) {
                var info = this.eventInfos[i];
                var globalMatrix = info.displayObject.globalMatrix;
                //思考，invert 是什么意思？对应线性代数的什么概念？为什么要做这一步？
                var invertGlobalMatrix = math.invertMatrix(globalMatrix);
                var newPoint = math.pointAppendMatrix(stageClickedPoint, invertGlobalMatrix);
                //如果检测返回true，则认为点中了
                if (info.hitTest(newPoint, info.displayObject)) {
                    info.onClick();
                    break;
                }
            }
        };

        init() {
            this.eventInfos = [];
            var canvas = document.getElementById("game");
            canvas.addEventListener("click", this.onStageClick);
        }


        register(displayObject:render.DisplayObject,hitTest:(localPoint: math.Point, displayObject: render.DisplayObject) => Boolean,onClick: () => void) {
            this.eventInfos.push({displayObject,hitTest,onClick});

        }

    }
}