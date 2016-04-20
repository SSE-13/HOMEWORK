module ui {
    
    
    export class Button extends render.DisplayObjectContainer {
        
        private background:render.Bitmap;
        
        private label:render.TextField;
        
        constructor(){
           
            super();
             this.background = new render.Bitmap();
             this.label = new render.TextField();
             
        }
        
        
        
        
    }
    
    
    
}