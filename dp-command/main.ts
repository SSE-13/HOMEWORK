class Invoker {
    
    private _list:Array<any>;
    
    
    init(){
        this._list = [];
    }
    
    canUndo(){
        return this._list.length > 0;
    }
    
    
    undo(){
        var command = this._list.pop();
        command.undo();
    }
    
    setCommand(command){
        command.execute();
        this._list.push(command);
    }
    
}



class Command {
    
    execute(){
        
    }
    
}


class CommandA extends Command{
    
    private col;
    private row;
    constructor(col,row){
        super();
        this.col = col;
        this.row = row;
        
    }
    
    execute(){
        console.log ("execute " + this.row);
    }
    
    undo(){
        console.log ("Undo " + this.row)
    }
}

var invoker = new Invoker();
invoker.init();
var a1 = new CommandA(1,1);
var a2 = new CommandA(2,2);
invoker.setCommand(a1);
invoker.setCommand(a2);
invoker.undo();