//自定义字典 es6 实现私有属性，但无法继承
const Dictionary = (function () {
    const items = new WeakMap();
    class Dictionary {
        constructor () {
            items.set(this, {});
        }
        //向字典中添加新元素
        set (key, value) {
            let dictionary = items.get(this);
            dictionary[key] = value;
        }
        //通过使用键名来从字典中移除键名对应的数值
        delete (key) {
            let dictionary = items.get(this);
            if (this.has(key)) {
                delete dictionary[key];
                return true;
            }
            return false;
        }
        //判断某个键值是否存在于这个字典中
        has (key) {
            let dictionary = items.get(this);
            return dictionary.hasOwnProperty(key);
        }
        //通过键名查找特定的数值并返回
        get (key) {
            let dictionary = items.get(this);
            return this.has(key) ? dictionary[key] : undefined;
        }
        //将这个字典中的所有元素全部删除
        clear () {
            items.set(this, {});
        }
        //返回字典所包含元素的数量
        size () {
            let dictionary = items.get(this);
            return Object.keys(dictionary).length;
        }
        //将字典所包含的所有键名以数组形式返回
        keys () {
            let dictionary = items.get(this);
            return Object.keys(dictionary);
        }
        //将字典所包含的所有数值以数组形式返回
        values () {
            let dictionary = items.get(this);
            let values = [];
            for (let item of Object.keys(dictionary)) {
                values.push(dictionary[item]);
            }
            return values;
        }
        getItems () {
            let dictionary = items.get(this);
            return dictionary;
        }
    }
    return Dictionary;
})();

//散列表 es6 实现私有属性，但无法继承
const HashMap = (function () {
    const items = new WeakMap();
    class HashMap {
        constructor () {
            items.set(this, {
                //"lose lose"散列函数
                loseloseHashCode (key) {
                    let hash = 0;
                    for (let i = 0; i < key.length; i++) {
                        hash += key.charCodeAt(i);
                    }
                    return hash % 37;
                },
                table: []
            });
        }
        //向散列表增加一个新的项
        put (key, value) {
            let hashMap = items.get(this);
            let position = hashMap.loseloseHashCode(key);
            hashMap.table[position] = value;
        }
        //根据键名从散列表中移除值
        remove (key) {
            let hashMap = items.get(this);
            hashMap.table[hashMap.loseloseHashCode(key)] = undefined;
        }
        //返回根据键名检索到的值
        get (key) {
            let hashMap = items.get(this);
            return hashMap.table[hashMap.loseloseHashCode(key)];
        }
        getTable () {
            let hashMap = items.get(this);
            return hashMap.table;
        }
    }
    return HashMap;
})();
