/**
 * 并查集
 * TODO: union and find
 */
export default class UF {
  private id: number[];
  count: number;

  constructor(N: number) {
    this.count = N;
    this.id = new Array(N);
    for (let i = 0; i < N; i++) {
      this.id[i] = i;
    }
  }

  union(p: number, q: number) {
    const pID = this.find(p);
    const qID = this.find(q);
    if (qID === pID) return this;
    this.id.forEach((id, idx) => {
      if (id === pID) this.id[idx] = qID;
    });
    this.count--;
    return this;
  }

  find(p: number) {
    return this.id[p];
  }

  connected(p: number, q: number) {
    return this.find(p) === this.find(q);
  }
}
