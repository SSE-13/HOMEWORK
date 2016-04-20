var fs = require("fs");

module data {

    export class Storage {

        private static _instance: Storage;

        public static getInstance(): Storage {
            if (Storage._instance == null) {
                Storage._instance = new Storage();
            }
            return Storage._instance;
        }


        public readFile() {
            var map_path = __dirname + "/map.json"
            var content = fs.readFileSync(map_path, "utf-8");
            var obj = JSON.parse(content);
            this.mapData = obj.map;
        }
        
        public saveFile(){
            
        }
        
        public mapData;

    }



}