function mergeSort(arr) {
    if (arr.length === 1) return arr
    let mid = Math.floor((arr.length -1) / 2)
    let left = arr.slice(0, mid + 1);
    let right = arr.slice(mid + 1);
    
    return merge(mergeSort(left), mergeSort(right))
}

function merge( arr1, arr2) {
    
    let arr1Length = arr1.length;
    let arr2Length = arr2.length;
    let arr3 = [];
    let i= 0
    let j = 0
    let k = 0
    

    while (i < arr1Length && j < arr2Length) {
        if(arr1[i] < arr2[j]) {
            arr3[k] = arr1[i];
            k++;
            i++;
        } else {
            arr3[k] = arr2[j];
            k++;
            j++;
        }
    }

    for (; i < arr1Length; i++) {
        arr3[k] = arr1[i];
        k++;
    }

    for (; j < arr2Length; j++) {
        arr3[k] = arr2[j]
        k++;
    }
    
    return arr3
}

export default mergeSort;

export const array = (el) => new Array(el).fill(8).map(el => Math.floor(Math.random() * 1000))

//console.log(mergeSort(array(30)));
//console.log(Array.from(new Set(mergeSort(array(30)))));
