let startArray = []
for (let i = 0; i < 4; i++) {
   startArray.push(Array(4).fill(null))
}


const scripts = {
   degArr: (arr, way = 'right') => {
      const newArr = arr.map(() => []);
      for (let i = 0; i < arr.length; i++) {

         if (arr.length != arr[i].length) return console.error(new Error('this is not matrix'));

         for (let j = 0; j < arr[i].length; j++) {
            const mirror = arr.length - 1 - i
            if (way === "right") newArr[j][mirror] = arr[i][j];
            if (way === "left") newArr[arr.length - 1 - j][i] = arr[i][j];
         }
      }
      return newArr
   },
   randomValue: (value) => {
      return Math.floor(Math.random() * value);
   },
   takeEmpty: (value) => {
      if (!Array.isArray(value)) return

      const arr = [];

      for (let i = 0; i < 4; i++) {
         sec:for (let j = 0; j < 4; j++) {

            if (value[i][j] !== null) continue sec;

            arr.push(`${i},${j}`)
         }
      }
      return arr
   },
   checkIdentically: (arr1, arr2) => {
      for (let i = 0; i < arr1.length; i++) {
         if (arr1[i].reduce((acc, el, j) => acc || el !== arr2[i][j], false)) return false
      }
      return true
   },
   emptyArr:startArray
}
export default scripts;