var events;
(function (events) {
    function displayObjectRectHitTest(localPoint, displayObject) {
        return localPoint.x >= 0 && localPoint.x <= displayObject.width && localPoint.y >= 0 && localPoint.y <= displayObject.height;
    }
    events.displayObjectRectHitTest = displayObjectRectHitTest;
    class EventCore {
        constructor() {
            this.onStageClick = (e) => {
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
                        info.onClick(info.displayObject);
                        break;
                    }
                }
            };
        }
        init() {
            this.eventInfos = [];
            var canvas = document.getElementById("game");
            canvas.addEventListener("click", this.onStageClick);
        }
        register(displayObject, hitTest, onClick) {
            this.eventInfos.push({ displayObject: displayObject, hitTest: hitTest, onClick: onClick });
        }
    }
    events.EventCore = EventCore;
})(events || (events = {}));
