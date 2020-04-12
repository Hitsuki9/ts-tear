/**
 * 节点
 */
class Node {
  freq = 1; // 当前节点的 key 被使用的频率
  pre: Node | null = null; // 前一个节点
  post: Node | null = null; // 后一个节点
  constructor(public key: string, public val: any) {}
}

/**
 * 双向链表
 */
class DoublyLinkedList {
  head = new Node('', null); // 头节点
  tail = new Node('', null); // 尾节点
  constructor() {
    this.head.post = this.tail; // 初始化时，头节点的后一个节点为尾节点
    this.tail.pre = this.head; // 初始化时，尾节点的前一个节点为头节点
  }
  addNode(node: Node) {
    node.post = this.head.post;
    this.head.post!.pre = node;
    this.head.post = node;
    node.pre = this.head;
  }
  removeNode(node: Node) {
    node.pre!.post = node.post;
    node.post!.pre = node.pre;
  }
}

/**
 * 最不经常使用缓存
 */
export default class LFUCache {
  size = 0; // 当前已使用的容量
  minFreq = 0; // 最小使用频率
  cacheMap: Map<string, Node> = new Map();
  freqMap: Map<number, DoublyLinkedList> = new Map();
  constructor(public capacity: number /** 总容量 */) {}
  get(key: string) {
    // 缓存中没有这个 key，直接返回 -1
    if (!this.cacheMap.has(key)) {
      return -1;
    }
    // 获取缓存
    const node = this.cacheMap.get(key);
    // 将该节点的频率 +1
    this.incFreq(node!);
    // 返回该节点的值
    return node!.val;
  }
  put(key: string, value: any) {
    if (this.capacity === 0) return;
    const node = this.cacheMap.get(key);
    if (node) {
      // 若节点存在，则只需要更新该节点的值以及频率
      node.val = value;
      this.incFreq(node);
    } else {
      // 如果容量已被使用完，则需要移除最不经常使用的节点以空出容量
      if (this.capacity === this.size) {
        // 获取最小使用频率所对应的双向链表
        const minFreqLinkedList = this.freqMap.get(this.minFreq);
        // 将该链表的尾节点的前一个节点移除
        // 尾节点的前一个节点才是有效节点，尾节点充当哨兵作用
        this.cacheMap.delete(minFreqLinkedList!.tail.pre!.key);
        minFreqLinkedList!.removeNode(minFreqLinkedList!.tail.pre!);
        this.size--;
      }
      // 将该值封装成节点并放入 cacheMap 中
      const newNode = new Node(key, value);
      this.cacheMap.set(key, newNode);
      // 同时需要将该节点插入 freqMap 中频率最小的双向链表中
      let linkedList = this.freqMap.get(1);
      // 若使用频率为 1 的双向链表是空的，则创建一个并放进 freqMap 中
      if (!linkedList) {
        linkedList = new DoublyLinkedList();
        this.freqMap.set(1, linkedList);
      }
      linkedList.addNode(newNode);
      // 更新 size 和 minFreq
      this.size++;
      this.minFreq = 1;
    }
  }
  incFreq(node: Node) {
    let freq = node.freq;
    // 获取该使用频率对应的链表
    let linkedList = this.freqMap.get(freq);
    // 将该节点从频率对应的链表中移除
    linkedList!.removeNode(node);
    // 同时满足以下两种情况时，更新 Freq 的值
    // 1. 频率等于最小频率
    // 2. 该链表为空链表
    if (freq === this.minFreq && linkedList!.head.post === linkedList!.tail) {
      this.minFreq = freq + 1;
    }
    // 增加该节点的使用频率
    node.freq++;
    // 获取新频率对应的链表
    linkedList = this.freqMap.get(freq + 1);
    // 如果链表为空，则需要新建链表，并将其放入 freqMap
    if (!linkedList) {
      linkedList = new DoublyLinkedList();
      this.freqMap.set(freq + 1, linkedList);
    }
    // 将新频率的节点放进链表中
    linkedList.addNode(node);
  }
}
