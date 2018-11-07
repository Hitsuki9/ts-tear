function randomNumGenerator (n) {
    let array = [];
    for(let i = 0; i < n; i++) {
        array.push(Math.floor(Math.random() * 10000000));
    }
    // console.log(`未排序序列：${ array.join(', ') }`);
    return array;
}

//冒泡排序 时间复杂度O(n^2)
function bubbleSort (array) {
    let length = array.length;
    let begin = new Date();
    for (let i = 0; i < length; i++) {
        for (let j = 0; j < length - 1 - i; j++) {
            if (array[j] > array[j + 1]) {
                [array[j], array[j + 1]] = [array[j + 1], array[j]];
            }
        }
    }
    let end = new Date();
    // console.log(`冒泡排序：${ array.join(', ') }`);
    console.log(`冒泡-耗时：${ end - begin }ms`);
}

//选择排序 时间复杂度O(n^2)
function selectionSort (array) {
    let length = array.length,
        indexMin;
    let begin = new Date();
    for (let i = 0; i < length; i++) {
        indexMin = i;
        for (let j = i; j < length; j++) {
            if (array[indexMin] > array[j]) {
                indexMin = j;
            }
        }
        if (i !== indexMin) {
            [array[i], array[indexMin]] = [array[indexMin], array[i]];
        }
    }
    let end = new Date();
    // console.log(`选择排序：${ array.join(', ') }`);
    console.log(`选择-耗时：${ end - begin }ms`);
}

//插入排序 时间复杂度O(n^2)
function insertionSort (array) {
    let length = array.length,
        j, temp;
    let begin = new Date();
    for (let i = 1; i < length; i++) {
        j = i;
        temp = array[i];
        while (j > 0 && array[j - 1] > temp) {
            array[j] = array[j - 1];
            j--;
        }
        array[j] = temp;
    }
    let end = new Date();
    // console.log(`插入排序：${ array.join(', ') }`);
    console.log(`插入-耗时：${ end - begin }ms`);
}

//归并排序 时间复杂度O(nlogn)
function mergeSort (array) {
    let begin = new Date();
    let result = mergeSortHandle(array);
    let end = new Date();
    // console.log(`归并排序：${ result.join(', ') }`);
    console.log(`归并-耗时：${ end - begin }ms`);
}
function mergeSortHandle (array) {
    let length = array.length;
    if (length === 1) {
        return array;
    }
    let mid = Math.floor(length / 2),
        left = array.slice(0, mid),
        right = array.slice(mid, length);
    return merge(mergeSortHandle(left), mergeSortHandle(right));
}
function merge (left, right) {
    let result =[],
        l = 0,
        r = 0;
    while (l < left.length && r < right.length) {
        if(left[l] < right[r]) {
            result.push(left[l++]);
        } else{
            result.push(right[r++]);
        } 
    }
    while (l < left.length) {
        result.push(left[l++]);
    }
    while (r < right.length) {
        result.push(right[r++]);
    }
    return result;
}

let array = randomNumGenerator(100000);
bubbleSort(Object.assign([], array));
selectionSort(Object.assign([], array));
insertionSort(Object.assign([], array));
mergeSort(Object.assign([], array));
