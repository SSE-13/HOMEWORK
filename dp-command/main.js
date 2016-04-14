var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Invoker = (function () {
    function Invoker() {
    }
    Invoker.prototype.init = function () {
        this._list = [];
    };
    Invoker.prototype.undo = function () {
        var command = this._list.pop();
        command.undo();
    };
    Invoker.prototype.setCommand = function (command) {
        command.execute();
        this._list.push(command);
    };
    return Invoker;
}());
var Command = (function () {
    function Command() {
    }
    Command.prototype.execute = function () {
    };
    return Command;
}());
var CommandA = (function (_super) {
    __extends(CommandA, _super);
    function CommandA(col, row) {
        _super.call(this);
        this.col = col;
        this.row = row;
    }
    CommandA.prototype.execute = function () {
        console.log("execute " + this.row);
    };
    CommandA.prototype.undo = function () {
        console.log("Undo " + this.row);
    };
    return CommandA;
}(Command));
var invoker = new Invoker();
invoker.init();
var a1 = new CommandA(1, 1);
var a2 = new CommandA(2, 2);
invoker.setCommand(a1);
invoker.setCommand(a2);
invoker.undo();
