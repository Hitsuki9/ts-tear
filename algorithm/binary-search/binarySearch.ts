/**
 * 二分查找
 * @param nums 数组
 * @param target 目标元素
 */
export default function binarySearch(nums: number[], target: number) {
  let left = 0,
    right = nums.length;
  while (left < right) {
    const mid = left + Math.floor((right - left) / 2);
    if (target > nums[mid]) {
      left = mid + 1;
    } else if (target < nums[mid]) {
      right = mid;
    } else {
      return mid;
    }
  }
  return -1;
}
