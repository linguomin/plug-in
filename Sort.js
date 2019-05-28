'use strict';
/**
 * 9中排序方法
 * system、bubbling、quick、insert、selection、shell、merge、heap、counting
 * 推荐使用插入排序insert
 * 调用方法:
 * 在别的js中使用import引入，例：
 * import Sort from './Sort.js';
 * Sort.insert(arr);
 */
export default {
  // 系统自带的排序API
  system(data) {
    return data.sort((a, b) => { return a - b; });
  },
  // 冒泡排序---稳定
  bubbling(data) {
    for (let i = 0; i < data.length - 1; i++) {
      let bool = true;
      for (let j = 0; j < data.length - i - 1; j++) {
        if (data[j] > data[j + 1]) {
          [data[j], data[j + 1]] = [data[j + 1], data[j]];
          bool = false;
        }
      }
      if (bool) break;
    }
    return data;
  },
  // 快速排序----不稳定
  quick(data) {
    if (data.length <= 1) return data;
    let left = [];
    let right = [];
    let pivotIndex = Math.floor(data.length / 2);
    let pivot = data.splice(pivotIndex, 1)[0];
    for (let i = 0; i < data.length; i++) {
      if (data[i] < pivot) left.push(data[i]);
      else right.push(data[i]);
    }
    return this.quick(left).concat([pivot], this.quick(right));
  },
  // 插入排序-----稳定
  insert(data) {
    // 假设第0个元素是一个有序的数列，第1个以后的是无序的数列
    // 所以第1个元素开始将无序数列的元素插入到有序数列中
    for (let i = 1; i < data.length; i++) {
      // 升序
      if (data[i] < data[i - 1]) {
        // 取出无序数列中的第i个作为被插入元素
        let guard = data[i];
        // 记住有序数列的最后一个位置，并且将有序数列位置扩大一个
        let j = i - 1;
        data[i] = data[j];
        // 比大小，找到被插入元素所在的位置
        while (j >= 0 && guard < data[j]) {
          data[j + 1] = data[j];
          j--;
        }
        data[j + 1] = guard;// 插入
      }
    }
    return data;
  },
  // 选择排序---排序耗时长---不稳定
  selection(data) {
    let [len, minIndex] = [data.length, null];
    for (let i = 0; i < len - 1; i++) {
      minIndex = i;
      for (let j = i + 1; j < len; j++) {
        if (data[j] < data[minIndex]) minIndex = j; //寻找最小的数，将最小数的索引保存
      }
      [data[i], data[minIndex]] = [data[minIndex], data[i]];
    }
    return data;
  },
  // 希尔排序---排序耗时长----不稳定
  shell(data) {
    let [len, temp, gap] = [data.length, , 1];
    while (gap < len / 5) gap = gap * 5 + 1; //动态定义间隔序列
    for (gap; gap > 0; gap = Math.floor(gap / 5)) {
      for (let i = gap; i < len; i++) {
        temp = data[i];
        let j = i - gap;
        for (j; j >= 0 && data[j] > temp; j -= gap) {
          data[j + gap] = data[j];
        }
        data[j + gap] = temp;
      }
    }
    return data;
  },
  // 归并排序----采用自下而上递归方法---排序耗时长----稳定
  merge(data) {
    function dealMerge(left, right) {
      let result = [];
      while (left.length && right.length) {
        if (left[0] <= right[0]) result.push(left.shift());
        else result.push(right.shift());
      }
      while (left.length) result.push(left.shift());
      while (right.length) result.push(right.shift());
      return result;
    };
    let len = data.length;
    if (len < 2) return data;
    let middle = Math.floor(len / 2);
    let left = data.slice(0, middle);
    let right = data.slice(middle);
    return dealMerge(this.merge(left), this.merge(right));
  },
  // 堆排序---排序耗时长---不稳定
  heap(data) {
    function heapify(data, x, len) {
      if (Object.prototype.toString.call(data).slice(8, -1) === 'Array' && typeof x === 'number') {
        let [l, r, largest] = [2 * x + 1, 2 * x + 2, x];
        if (l < len && data[l] > data[largest]) largest = 1;
        if (r < len && data[r] > data[largest]) largest = r;
        if (largest != x) {
          [data[x], data[largest]] = [data[largest], data[x]];
          heapify(data, largest, len);
        }
      } else return 'data is not an Array or x is not a number!';
    }
    if (Object.prototype.toString.call(data).slice(8, -1) === 'Array') {
      let heapSize = data.length; //建堆
      for (let i = Math.floor(heapSize / 2) - 1; i >= 0; i--) heapify(data, i, heapSize);
      for (let j = heapSize - 1; j >= 1; j--) {//堆排序
        [data[0], data[j]] = [data[j], data[0]];
        heapify(data, 0, --heapSize);
      }
      return data;
    } else return 'data is not an Array!';
  },
  // 计数排序---排序耗时长----稳定
  // 计数排序使用一个额外的数组C，其中第i个元素是待排序数组A中值等于i的元素的个数。
  // 然后根据数组C来将A中的元素排到正确的位置。它只能对整数进行排序。
  counting(data) {
    let [len, B, C, min, max] = [data.length, [], [], data[0], data[0]];
    for (let i = 0; i < len; i++) {
      min = min <= data[i] ? min : data[i];
      max = max >= data[i] ? max : data[i];
      C[data[i]] = C[data[i]] ? C[data[i]] + 1 : 1;
    }
    for (let j = min; j < max; j++) {
      C[j + 1] = (C[j + 1] || 0) + (C[j] || 0);
    }
    for (let k = len - 1; k >= 0; k--) {
      B[C[data[k]] - 1] = data[k];
      C[data[k]]--;
    }
    return B;
  }
}