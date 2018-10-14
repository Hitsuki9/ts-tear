const Dictionary = require('./dictionary.js');
const Queue = require('./queue.js');

//图 es6 实现私有属性，但无法继承
const Graph = (function () {
    const params = new WeakMap();
    class Graph {
        constructor () {
            params.set(this, {
                vertices: [],//存储结点的名字
                adjList: new Dictionary(),//使用字典作为邻接表
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
        //从结点v开始进行深度优先搜索
        dfs (v) {

        }
    }
    return Graph;
})();
