const Dictionary = require('./dictionary.js');
const Queue = require('./queue.js');

//图 无向 未加权 es6 实现私有属性，但无法继承
const Graph = (function () {
    const params = new WeakMap();
    class Graph {
        constructor () {
            params.set(this, {
                vertices: [],//存储结点的名字
                adjList: new Dictionary(),//使用字典作为邻接表
                time: 0,
                /**
                 * 搜索方法的辅助函数 初始化结点颜色
                 * 白色：该结点还没有被访问
                 * 灰色：该结点被访问过，但并未被探索过
                 * 黑色：该结点被访问过且被探索过
                 */
                initializeColor () {
                    let color = [];
                    for (let i = 0; i < this.vertices.length; i++) {
                        color[this.vertices[i]] = 'white';
                    }
                    return color;
                },
                dfsVisit (u, color, callback) {//深度优先搜索的辅助函数
                    color[u] = 'grey';
                    if (callback) {
                        callback(u);
                    }
                    let neighbors = this.adjList.get(u);
                    for (let i = 0; i < neighbors.length; i++) {
                        let w = neighbors[i];
                        if (color[w] === 'white') {
                            this.dfsVisit(w, color, callback);
                        }
                    }
                    color[u] = 'black';
                },
                DFSVisit (u, color, d, f, p) {//改进的深度优先搜索的辅助函数
                    console.log(`discovered ${u}`);
                    color[u] = 'grey';
                    d[u] = ++this.time;
                    let neighbors = this.adjList.get(u);
                    for (let i = 0; i < neighbors.length; i++) {
                        let w = neighbors[i];
                        if (color[w] === 'white') {
                            p[w] = u;
                            this.DFSVisit(w, color, d, f, p);
                        }
                    }
                    color[u] = 'black';
                    f[u] = ++this.time;
                    console.log(`explored ${u}`);
                }
            });
        }
        //向图中添加一个新的结点
        addVertex (v) {
            let graph = params.get(this);
            graph.vertices.push(v);
            graph.adjList.set(v, []);
        }
        //添加结点之间的边
        addEdge (v, w) {
            let graph = params.get(this);
            graph.adjList.get(v).push(w);
            graph.adjList.get(w).push(v);
        }
        //从结点v开始进行广度优先搜索
        bfs (v) {
            let graph = params.get(this);
            let color = graph.initializeColor(),
                queue = new Queue();
            queue.enqueue(v);
            while (!queue.isEmpty()) {
                let u = queue.dequeue(),
                    neighbors = graph.adjList.get(u);
                color[u] = 'grey';
                for (let i = 0; i < neighbors.length; i++) {
                    let w = neighbors[i];
                    if (color[w] === 'white') {
                        color[w] = 'grey';
                        queue.enqueue(w);
                    }
                }
                color[u] = 'black';
                console.log(u);
            }
        }
        //改进过的广度优先搜索
        BFS (v) {
            let graph = params.get(this);
            let color = graph.initializeColor(),
                queue = new Queue(),
                d = [],//结点v到所有结点的距离
                pred = [];//所有结点的前溯点
            queue.enqueue(v);
            for (let i = 0; i < graph.vertices.length; i++) {
                d[graph.vertices[i]] = 0;
                pred[graph.vertices[i]] = null;
            }
            while (!queue.isEmpty()) {
                let u = queue.dequeue(),
                    neighbors = graph.adjList.get(u);
                color[u] = 'grey';
                for (let i = 0; i < neighbors.length; i++) {
                    let w = neighbors[i];
                    if (color[w] === 'white') {
                        color[w] = 'grey';
                        d[w] = d[u] + 1;
                        pred[w] = u;
                        queue.enqueue(w);
                    }
                }
                color[u] = 'black';
            }
            return {
                distances: d,
                predecessors: pred
            };
        }
        //深度优先搜索
        dfs () {
            let graph = params.get(this);
            let color = graph.initializeColor();
            for (let i = 0; i < graph.vertices.length; i++) {
                if (color[graph.vertices[i]] === 'white') {
                    graph.dfsVisit(graph.vertices[i], color, value => {
                        console.log(value);
                    });
                }
            }
        }
        //改进过的深度优先搜索
        DFS () {
            let graph = params.get(this);
            let color = graph.initializeColor(),
                d = [],//所有结点的发现时间
                f = [],//所有结点的完成探索实践
                p = [];//所有结点的前溯点
            graph.time = 0;
            for (let i = 0; i < graph.vertices.length; i++) {
                f[graph.vertices[i]] = 0;
                d[graph.vertices[i]] = 0;
                p[graph.vertices[i]] = null;
            }
            for (let i = 0; i < graph.vertices.length; i++) {
                if (color[graph.vertices[i]] === 'white') {
                    graph.DFSVisit(graph.vertices[i], color, d, f, p);
                }
            }
            return {
                discovery: d,
                finished: f,
                predecessors: p
            };
        }
    }
    return Graph;
})();

//Dijkstra算法
function dijkstra (src) {
    let graph = [//邻接矩阵
        [0, 2, 4, 0, 0, 0],
        [0, 0, 1, 4, 2, 0],
        [0, 0, 0, 0, 3, 0],
        [0, 0, 0, 0, 0, 2],
        [0, 0, 0, 3, 0, 2],
        [0, 0, 0, 0, 0, 0]
    ];
    let dist = [],
        visited = [],
        length = graph.length;
    for (let i = 0; i < length; i++) {
        dist[i] = Number.MAX_SAFE_INTEGER;//初始化所有距离
        visited[i] = false;
    }
    dist[src] = 0;//源顶点到自己的距离为0
    for (let i = 0; i < length - 1; i++) {
        let u = minDistance(dist, visited);
        visited[u] = true;
        for (let i = 0; i < length; i++) {
            if (!visited[i] && graph[u][i] != 0 && dist[u] != Number.MAX_SAFE_INTEGER && dist[u] + graph[u][i] < dist[i]) {
                dist[i] = dist[u] + graph[u][i];
            }
        }
    }
    return dist;
}
function minDistance (dist, visited) {
    let min = Number.MAX_SAFE_INTEGER,
        minIndex = -1;
    for (let i = 0; i < dist.length; i++) {
        if (visited[i] === false && dist[i] <= min) {
            min = dist[i];
            minIndex = i;
        }
    }
    return minIndex;
}

//Floyd-Warshall算法
function floydWarshall () {
    let INF = Number.MAX_SAFE_INTEGER;
    let graph = [//邻接矩阵
        [0, 2, 4, INF, INF, INF],
        [INF, 0, 1, 4, 2, INF],
        [INF, INF, 0, INF, 3, INF],
        [INF, INF, INF, 0, INF, 2],
        [INF, INF, INF, 3, 0, 2],
        [INF, INF, INF, INF, INF, 0]
    ];
    let dist = [],
        length = graph.length;
    //初始化dist数组为每个顶点之间的权值
    for (let i = 0; i < length; i++) {
        dist[i] = [];
        for (let j = 0; j < length; j++) {
            dist[i][j] = graph[i][j];
        }
    }
    for (let i = 0; i < length; i++) {
        for (let j = 0; j < length; j++) {
            for (let k = 0; k < length; k++) {
                if (dist[j][i] + dist[i][k] < dist[j][k]) {
                    dist[j][k] = dist[j][i] + dist[i][k];
                }
            }
        }
    }
    return dist;
}

//Prim算法
function prim () {
    let graph = [//邻接矩阵
        [0, 2, 4, 0, 0, 0],
        [2, 0, 2, 4, 2, 0],
        [4, 2, 0, 0, 3, 0],
        [0, 4, 0, 0, 3, 2],
        [0, 2, 3, 3, 0, 2],
        [0, 0, 0, 2, 2, 0]
    ];
    let parent = [],//MST路径
        key = [],//权重
        visited = [],
        length = graph.length;
    for (let i = 0; i < length; i++) {
        key[i] = Number.MAX_SAFE_INTEGER;
        visited[i] = false;
    }
    key[0] = 0;
    parent[0] = 0;
    for (let i = 0; i < length; i++) {
        let u = minKey(key, visited);
        visited[u] = true;
        for (let i = 0; i < length; i++) {
            if (graph[u][i] && visited[i] === false && graph[u][i] < key[i]) {
                parent[i] = u;
                key[i] = graph[u][i];
            }
        }
    }
    for (let i = 0; i < length; i++) {
        parent[i] = `${parent[i]} - ${i}`;
    }
    return { parent, key };
}
function minKey (key, visited) {
    let min = Number.MAX_SAFE_INTEGER,
        minIndex = -1;
    for (let i = 0; i < key.length; i++) {
        if (visited[i] === false && key[i] <= min) {
            min = key[i];
            minIndex = i;
        }
    }
    return minIndex;
}
