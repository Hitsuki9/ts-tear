/**
 * 加权并查集
 */
export default class UF {
  private id: number[];
  private sz: number[]; // 各个根节点所对应的分量的大小（权重）
  count: number;

  constructor(N: number) {
    this.count = N;
    this.id = new Array(N);
    this.sz = new Array(N);
    for (let i = 0; i < N; i++) {
      this.id[i] = i;
      this.sz[i] = 1;
    }
  }

  union(p: number, q: number) {
    const i = this.find(p);
    const j = this.find(q);
    if (i === j) return this;
    // 将小树的根节点连接到大树的根节点
    if (this.sz[i] < this.sz[j]) {
      this.id[i] = j;
      this.sz[j] += this.sz[i];
    } else {
      this.id[j] = i;
      this.sz[i] += this.sz[j];
    }
    this.count--;
    return this;
  }

  find(p: number) {
    while (p !== this.id[p]) p = this.id[p];
    return p;
  }

  connected(p: number, q: number) {
    return this.find(p) === this.find(q);
  }
}
