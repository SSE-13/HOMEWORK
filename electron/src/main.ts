// alert ("Hello,World");


module game {


    const GRID_PIXEL_WIDTH = 50;

    const GRID_PIXEL_HEIGHT = 50;

    export class WorldMap extends DisplayObject {


        private cache: HTMLCanvasElement;

        public isDirty = true;

        private nunRows = 4;

        private numCols = 4;

        private mapData;

        constructor(mapData: any) {

            super();

            this.mapData = mapData;
            var rows = obj.map.length;
            var cols = obj.map[0].length;
            this.numCols = cols;
            this.nunRows = rows;
            this.cache = document.createElement("canvas");
            this.cache.width = 400;
            this.cache.height = 400;

        }

        render(context: CanvasRenderingContext2D) {
            if (this.isDirty) {
                var cacheContext = this.cache.getContext("2d");
                cacheContext.strokeStyle = '#000000';
                for (var i = 0; i < this.numCols; i++) {
                    for (var j = 0; j < this.nunRows; j++) {
                        cacheContext.beginPath();
                        console.log(this.mapData[j][i])
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
}


import * as fs from 'fs';
var map_path = __dirname + "/map.json"
var content = fs.readFileSync(map_path, "utf-8");
console.log(content);

var obj = JSON.parse(content);
var world = new game.WorldMap(obj.map);

var renderCore = new RenderCore();
renderCore.start([world]);


window.onclick = () => {
    alert (111)
    obj.map[2][1] = 0;
    world.isDirty = true;
    var content_new = JSON.stringify(obj);
    fs.writeFileSync(__dirname + "/map.json", content_new, "utf-8")
}

