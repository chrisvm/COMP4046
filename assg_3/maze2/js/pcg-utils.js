var maze;

function staticMaze() {
    return {
        "w": 5,
        "h": 4,
        "floor": [
            1, 1, 1, 1, 1,
            1, 1, 1, 1, 1,
            1, 1, 1, 1, 1,
            1, 1, 1, 1, 1
        ],
        "yzwall": [
            2, 0, 0, 0, 0, 2,
            2, 2, 0, 0, 2, 2,
            2, 0, 0, 2, 2, 2,
            2, 0, 0, 2, 0, 2
        ],
        "xzwall": [
            2, 2, 2, 2, 2,
            0, 2, 2, 0, 0,
            0, 0, 2, 0, 2,
            0, 2, 2, 0, 0,
            2, 2, 2, 2, 2
        ],
        "goal": {
            "x": 4,
            "y": 3
        }
    };
}


// Represents an edge from source to sink with capacity
var Edge = function(source, sink, capacity) {
    this.source = source;
    this.sink = sink;
    this.capacity = capacity;
};

// Main class to manage the network
var Graph = function() {
    this.edges = {};
    this.nodes = [];
    this.nodeMap = {};

    // Add a node to the graph
    this.addNode = function(node) {
        this.nodes.push(node);
        this.nodeMap[node] = this.nodes.length-1;
        this.edges[node] = [];
    };

    // Add an edge from source to sink with capacity
    this.addEdge = function(source, sink, capacity) {
        // Create the two edges = one being the reverse of the other
        this.edges[source].push(new Edge(source, sink, capacity));
        this.edges[sink].push(new Edge(sink, source, capacity));
    };

    // Does edge from source to sink exist?
    this.edgeExists = function(source, sink) {
        if (this.edges[source] !== undefined)
            for(var i = 0; i < this.edges[source].length; i++)
                if (this.edges[source][i].sink == sink)
                    return this.edges[source][i];
        return null;
    };
};

function Prim(g) {
    var result = [];
    var usedNodes = {};

    function findMin(g) {
        var min = [999999, null];
        for(var i = 0; i < result.length; i++)
            for(var n = 0; n < g.edges[result[i]].length; n++)
                if(g.edges[result[i]][n].capacity < min[0] && usedNodes[g.edges[result[i]][n].sink] === undefined)
                    min = [g.edges[result[i]][n].capacity, g.edges[result[i]][n].sink];
        return min[1];
    }

    // Pick random start point
    var node = g.nodes[Math.round(Math.random()*(g.nodes.length - 1))];
    result.push(node);
    usedNodes[node] = true;

    var min = findMin(g);
    while(min != null) {
        result.push(min);
        usedNodes[min] = true;
        min = findMin(g);
    }

    return result;
}


function generateMaze() {

    var g = new Graph(),
        width = randomIntFromInterval(10, 55),
        height = randomIntFromInterval(15, 60);

    for (var x = 0; x < width; x++) {
        for (var y = 0; y < height; y++) {
            var current = new THREE.Vector2(x, y);
            g.addNode(current);
        }
    }

    for (var x = 0; x < width; x++) {
        for (var y = 0; y < height; y++) {
            var current = new THREE.Vector2(x, y);

            if (x - 1 >= 0)
                g.addEdge(current, new THREE.Vector2(x - 1, y), 1);
            if (x + 1 < width)
                g.addEdge(current, new THREE.Vector2(x + 1, y), 1);
            if (y - 1 >= 0)
                g.addEdge(current, new THREE.Vector2(x, y - 1), 1);
            if (y + 1 < height) {
                g.addEdge(current, new THREE.Vector2(x, y + 1), 1);
            }
        }
    }

    var result = Prim(g)
    var ret = {};
    ret.w = width;
    ret.h = height;
    ret.floor = [];
    for (var x = 0; x < width * height; x++) {
        floor[x] = 1;
    }

    // xz walls
    for (var index = ((width + 1) * height) - 1; index >= 0; index--) {
        x = index % (width + 1);
        y = ~~(index / (width + 1));
        if ((x % width == 0) || ((x + 1) % width == 0)) {
            ret.xzwall = 2;
            continue;
        }
        var ran_index = randomIntFromInterval(0, g.edges[new THREE.Vector2(x, y)].length);

    }
    for (var y = 0; y < height; y++) {
        for (var x = 0; x < width; x++) {


        }
    }
}

function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

THREE.Vector2.prototype.toString = function () {
    var ret = '{"x": ' + this.x + ', "y": ' + this.y + '}';
    return ret;
};

THREE.Vector3.prototype.toString = function () {
    var ret = '{"x": ' + this.x + ', "y": ' + this.y + ', "z": ' + this.z + '}';
    return ret;
};