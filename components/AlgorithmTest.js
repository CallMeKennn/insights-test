export const intersect = (nums1, nums2) => {
  const map = {};
  const result = [];

  for (let num of nums1) {
    map[num] = (map[num] || 0) + 1;
  }

  for (let num of nums2) {
    if (map[num] > 0) {
      result.push(num);
      map[num]--;
    }
  }

  return result;
};
