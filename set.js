//自定义集合 es6 实现私有属性，但无法继承
const Set = (function () {
    const items = new WeakMap();
    class Set {
        constructor () {
            items.set(this, {});
        }
        //向集合添加一个新的项
        add (value) {
            let set = items.get(this);
            if (!this.has(value)) {
                set[value] = value;
                return true;
            }
            return false;
        }
        //从集合移除一个值
        remove (value) {
            let set = items.get(this);
            if (this.has(value)) {
                delete set[value];
                return true;
            }
            return false;
        }
        //判断某项是否在集合中
        has (value) {
            let set = items.get(this);
            return set.hasOwnProperty(value);
        }
        //移除集合中的所有项
        clear () {
            items.set(this, {});
        }
        //返回集合所包含元素的数量
        size () {
            let set = items.get(this);
            return Object.keys(set).length;
        }
        //返回一个包含集合中所有值的数组
        values () {
            let set = items.get(this);
            let values = [];
            for (let item of Object.keys(set)) {
                values.push(set[item]);
            }
            return values;
        }
        //并集
        union (anotherSet) {
            let unionSet = new Set();
            let values = this.values();
            for (let item of values) {
                unionSet.add(item);
            }
            values = anotherSet.values();
            for (let item of values) {
                unionSet.add(item);
            }
            return unionSet;
        }
        //交集
        intersection (anotherSet) {
            let intersectionSet = new Set();
            let values = this.values();
            for (let item of values) {
                if (anotherSet.has(item)) {
                    intersectionSet.add(item);
                }
            }
            return intersectionSet;
        }
        //差集(属于this但不属于anotherSet)
        difference (anotherSet) {
            let differenceSet = new Set();
            let values = this.values();
            for (let item of values) {
                if (!anotherSet.has(item)) {
                    differenceSet.add(item);
                }
            }
            return differenceSet;
        }
        //子集(this是否是anotherSet的子集)
        subset (anotherSet) {
            if (this.size() > anotherSet.size()) {
                return false;
            } else {
                let values = this.values();
                for (let item of values) {
                    if (!anotherSet.has(item)) {
                        return false;
                    }
                }
                return true;
            }
        }
    }
    return Set;
})();
