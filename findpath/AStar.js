var astar;
(function (astar) {
    var Node = (function () {
        function Node(x, y) {
            this.walkable = true;
            this.costMultiplier = 1.0;
            this.visited = false;
            this.inPath = false;
            this.x = x;
            this.y = y;
        }
        Node.prototype.toString = function () {
            if (this.inPath) {
                return "田";
            }
            else {
                return "口";
            }
        };
        return Node;
    }());
    astar.Node = Node;
    var Grid = (function () {
        function Grid(numCols, numRows) {
            this._numCols = numCols;
            this._numRows = numRows;
            this._nodes = [];
            for (var i = 0; i < this._numCols; i++) {
                this._nodes[i] = [];
                for (var j = 0; j < this._numRows; j++) {
                    this._nodes[i][j] = new Node(i, j);
                }
            }
        }
        Grid.prototype.getNode = function (x, y) {
            return this._nodes[x][y];
        };
        Grid.prototype.setStartNode = function (x, y) {
            this._startNode = this._nodes[x][y];
        };
        Grid.prototype.setEndNode = function (x, y) {
            this._endNode = this._nodes[x][y];
        };
        Grid.prototype.setWalkable = function (x, y, value) {
            this._nodes[x][y].walkable = value;
        };
        Object.defineProperty(Grid.prototype, "startNode", {
            get: function () {
                return this._startNode;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Grid.prototype, "endNode", {
            get: function () {
                return this._endNode;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Grid.prototype, "numCols", {
            get: function () {
                return this._numCols;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Grid.prototype, "numRows", {
            get: function () {
                return this._numRows;
            },
            enumerable: true,
            configurable: true
        });
        Grid.prototype.getNeighbors = function (node) {
            var result = [];
            var startX = Math.max(0, node.x - 1);
            var endX = Math.min(this.numCols - 1, node.x + 1);
            var startY = Math.max(0, node.y - 1);
            var endY = Math.min(this.numRows - 1, node.y + 1);
            for (var i = startX; i <= endX; i++) {
                for (var j = startY; j <= endY; j++) {
                    result.push(this.getNode(i, j));
                }
            }
            return result;
        };
        Grid.prototype.toString = function () {
            var result = "";
            for (var y = 0; y < this._numRows; y++) {
                for (var x = 0; x < this._numCols; x++) {
                    result += this._nodes[x][y].toString();
                }
                result += "\n";
            }
            return result;
            // return this._nodes.map(
            //     (arr) => arr.map(
            //         (node) => node.toString()
            //     ).join("")
            // ).join("\n")
        };
        return Grid;
    }());
    astar.Grid = Grid;
    var STRAIGHT_COST = 1;
    var DIAG_COST = Math.SQRT2;
    var AStar = (function () {
        function AStar() {
        }
        AStar.prototype.manhattan = function (node) {
            var _endNode = this._endNode;
            var cost = Math.abs(node.x - _endNode.x) * STRAIGHT_COST
                + Math.abs(node.y + _endNode.y) * STRAIGHT_COST;
            return cost;
        };
        AStar.prototype.euclidian = function (node) {
            var _endNode = this._endNode;
            var dx = node.x - _endNode.x;
            var dy = node.y - _endNode.y;
            return Math.sqrt(dx * dx + dy * dy) * STRAIGHT_COST;
        };
        AStar.prototype.diagonal = function (node) {
            var _endNode = this._endNode;
            var dx = Math.abs(node.x - _endNode.x);
            var dy = Math.abs(node.y - _endNode.y);
            var diag = Math.min(dx, dy);
            var straight = dx + dy;
            return DIAG_COST * diag + STRAIGHT_COST * (straight - 2 * diag);
        };
        AStar.prototype.setHeurisitic = function (heuristic) {
            this._heuristic = heuristic;
        };
        AStar.prototype.findPath = function (grid) {
            this._grid = grid;
            this._open = new Array();
            this._closed = new Array();
            this._startNode = this._grid.startNode;
            this._endNode = this._grid.endNode;
            this._startNode.g = 0;
            this._startNode.h = this._heuristic(this._startNode);
            this._startNode.f = this._startNode.g + this._startNode.h;
            return this.search();
        };
        AStar.prototype.isOpen = function (node) {
            return this._open.indexOf(node) >= 0;
        };
        AStar.prototype.isClosed = function (node) {
            return this._closed.indexOf(node) >= 0;
        };
        AStar.prototype.search = function () {
            var grid = this._grid;
            var openList = this._open;
            var closedList = this._closed;
            var node = this._startNode;
            while (node != this._endNode) {
                var neighbors = grid.getNeighbors(node);
                for (var i = 0; i < neighbors.length; i++) {
                    var test = neighbors[i];
                    if (test == node ||
                        !test.walkable ||
                        !grid.getNode(node.x, test.y).walkable ||
                        !grid.getNode(test.x, node.y).walkable) {
                        continue;
                    }
                    var cost = STRAIGHT_COST;
                    if (!((node.x == test.x) || (node.y == test.y))) {
                        cost = DIAG_COST;
                    }
                    var g = node.g + cost * test.costMultiplier;
                    var h = this._heuristic(test);
                    test.visited = true;
                    var f = g + h;
                    if (this.isOpen(test) || this.isClosed(test)) {
                        if (test.f > f) {
                            test.f = f;
                            test.g = g;
                            test.h = h;
                            test.parent = node;
                        }
                    }
                    else {
                        test.f = f;
                        test.g = g;
                        test.h = h;
                        test.parent = node;
                        openList.push(test);
                    }
                }
                closedList.push(node);
                if (openList.length == 0) {
                    console.log("no path found");
                    return false;
                }
                openList.sort(function (a, b) { return a.f - b.f; });
                node = openList.shift();
            }
            this.buildPath();
            return true;
        };
        AStar.prototype.buildPath = function () {
            this._path = new Array();
            var node = this._endNode;
            this._path.push(node);
            while (node != this._startNode) {
                node = node.parent;
                this._path.unshift(node);
                node.inPath = true;
            }
        };
        return AStar;
    }());
    astar.AStar = AStar;
})(astar || (astar = {}));
