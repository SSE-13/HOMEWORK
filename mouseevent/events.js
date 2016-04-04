var events;
(function (events) {
    var EventCore = (function () {
        function EventCore() {
            var _this = this;
            this.onStageClick = function (e) {
                //获取舞台坐标
                var stageClickedPoint = new math.Point(e.offsetX, e.offsetY);
                for (var i = 0; i < _this.eventInfos.length; i++) {
                    var info = _this.eventInfos[i];
                    var localMatrix = info.displayObject.globalMatrix;
                    var invertLocalMatrix = math.invertMatrix(localMatrix);
                    var newPoint = math.pointAppendMatrix(stageClickedPoint, invertLocalMatrix);
                    //如果检测返回true，则认为点中了
                    if (info.hitTest(newPoint, info.displayObject)) {
                        info.onClick();
                        break;
                    }
                }
            };
        }
        EventCore.prototype.init = function () {
            this.eventInfos = [];
            var canvas = document.getElementById("game");
            canvas.addEventListener("click", this.onStageClick);
        };
        EventCore.prototype.register = function (displayObject, hitTest, onClick) {
            this.eventInfos.push({ displayObject: displayObject, hitTest: hitTest, onClick: onClick });
        };
        return EventCore;
    }());
    events.EventCore = EventCore;
})(events || (events = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXZlbnRzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZXZlbnRzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQU9BLElBQU8sTUFBTSxDQStDWjtBQS9DRCxXQUFPLE1BQU0sRUFBQyxDQUFDO0lBY1g7UUFBQTtZQUFBLGlCQWdDQztZQTVCRyxpQkFBWSxHQUFHLFVBQUMsQ0FBYTtnQkFDekIsUUFBUTtnQkFDUixJQUFJLGlCQUFpQixHQUFHLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQztnQkFDN0QsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxLQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDO29CQUM5QyxJQUFJLElBQUksR0FBRyxLQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUM5QixJQUFJLFdBQVcsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLFlBQVksQ0FBQztvQkFDbEQsSUFBSSxpQkFBaUIsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLFdBQVcsQ0FBQyxDQUFDO29CQUN2RCxJQUFJLFFBQVEsR0FBRyxJQUFJLENBQUMsaUJBQWlCLENBQUMsaUJBQWlCLEVBQUUsaUJBQWlCLENBQUMsQ0FBQztvQkFDNUUsbUJBQW1CO29CQUNuQixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDO3dCQUM3QyxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7d0JBQ2YsS0FBSyxDQUFDO29CQUNWLENBQUM7Z0JBQ0wsQ0FBQztZQUNMLENBQUMsQ0FBQztRQWNOLENBQUM7UUFaRyx3QkFBSSxHQUFKO1lBQ0ksSUFBSSxDQUFDLFVBQVUsR0FBRyxFQUFFLENBQUM7WUFDckIsSUFBSSxNQUFNLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUM3QyxNQUFNLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUN4RCxDQUFDO1FBR0QsNEJBQVEsR0FBUixVQUFTLGFBQWtDLEVBQUMsT0FBZ0YsRUFBQyxPQUFtQjtZQUM1SSxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxFQUFDLGVBQUEsYUFBYSxFQUFDLFNBQUEsT0FBTyxFQUFDLFNBQUEsT0FBTyxFQUFDLENBQUMsQ0FBQztRQUUxRCxDQUFDO1FBRUwsZ0JBQUM7SUFBRCxDQUFDLEFBaENELElBZ0NDO0lBaENZLGdCQUFTLFlBZ0NyQixDQUFBO0FBQ0wsQ0FBQyxFQS9DTSxNQUFNLEtBQU4sTUFBTSxRQStDWiJ9