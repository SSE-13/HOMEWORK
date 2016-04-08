// alert ("Hello,World");
"use strict";
var game;
(function (game) {
    const GRID_PIXEL_WIDTH = 50;
    const GRID_PIXEL_HEIGHT = 50;
    class WorldMap extends DisplayObject {
        constructor(mapData) {
            super();
            this.isDirty = true;
            this.nunRows = 4;
            this.numCols = 4;
            this.mapData = mapData;
            var rows = obj.map.length;
            var cols = obj.map[0].length;
            this.numCols = cols;
            this.nunRows = rows;
            this.cache = document.createElement("canvas");
            this.cache.width = 400;
            this.cache.height = 400;
        }
        render(context) {
            if (this.isDirty) {
                var cacheContext = this.cache.getContext("2d");
                cacheContext.strokeStyle = '#000000';
                for (var i = 0; i < this.numCols; i++) {
                    for (var j = 0; j < this.nunRows; j++) {
                        cacheContext.beginPath();
                        console.log(this.mapData[j][i]);
                        if (this.mapData[j][i] == 0) {
                            //walkable
                            cacheContext.fillStyle = '#0000FF';
                        }
                        else {
                            cacheContext.fillStyle = '#FF0000';
                        }
                        cacheContext.rect(i * GRID_PIXEL_WIDTH, j * GRID_PIXEL_HEIGHT, GRID_PIXEL_WIDTH, GRID_PIXEL_HEIGHT);
                        cacheContext.fill();
                        cacheContext.stroke();
                        cacheContext.closePath();
                    }
                }
                this.isDirty = false;
            }
            context.drawImage(this.cache, 0, 0);
        }
    }
    game.WorldMap = WorldMap;
})(game || (game = {}));
const fs = require('fs');
var map_path = __dirname + "/map.json";
var content = fs.readFileSync(map_path, "utf-8");
console.log(content);
var obj = JSON.parse(content);
var world = new game.WorldMap(obj.map);
var renderCore = new RenderCore();
renderCore.start([world]);
window.onclick = () => {
    alert(111);
    obj.map[2][1] = 0;
    world.isDirty = true;
    var content_new = JSON.stringify(obj);
    fs.writeFileSync(__dirname + "/map.json", content_new, "utf-8");
};
