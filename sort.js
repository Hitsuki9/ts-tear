function randomNumGenerator (n) {
    let array = [];
    for(let i = 0; i < n; i++) {
        array.push(Math.floor(Math.random() * 1000000));
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
    console.log(`耗时：${ end - begin }ms`);
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
    console.log(`耗时：${ end - begin }ms`);
}

//插入排序
function insertionSort (array) {
    let length = array.length,
        j, temp;
}

let array = randomNumGenerator(100000);
bubbleSort(array);
selectionSort(array);
