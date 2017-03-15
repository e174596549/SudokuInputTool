let example6 = [
    0, 2, 1, 0, 3, 0,
    3, 0, 0, 6, 0, 1,
    0, 1, 0, 0, 0, 2,
    2, 0, 0, 0, 1, 0,
    4, 0, 2, 0, 0, 3,
    0, 3, 0, 2, 6, 0
]

let aaa = 021030300601010002200010402003030260

let quchong = function(arr) {
    var newArr = Array.from(new Set(arr))
    for (var i = 0; i < newArr.length; i++) {
        newArr[i] = parseInt(newArr[i])
    }
    return newArr
}

function whitchPalace(i, j) {
    if (i < 2) {
        if (j < 3) {
            return 0
        } else {
            return 1
        }
    } else if (i < 4 && i > 1) {
        if (j < 3) {
            return 2
        } else {
            return 3
        }
    } else if (i > 3) {
        if (j < 2) {
            return 4
        } else {
            return 5
        }
    }
}

function sove6(arr) {
    let num = 0
    var soved = true
    let palace = [
        [arr[0][0], arr[0][1], arr[0][2], arr[1][0], arr[1][1], arr[1][2]],
        [arr[0][3], arr[0][4], arr[0][5], arr[1][3], arr[1][4], arr[1][5]],
        [arr[2][0], arr[2][1], arr[2][2], arr[3][0], arr[3][1], arr[3][2]],
        [arr[2][3], arr[2][4], arr[2][5], arr[3][3], arr[3][4], arr[3][5]],
        [arr[4][0], arr[4][1], arr[4][2], arr[5][0], arr[5][1], arr[5][2]],
        [arr[4][3], arr[4][4], arr[4][5], arr[5][3], arr[5][4], arr[5][5]]
    ]
    for (let i = 0; i < 6; i++) {
        for (let j = 0; j < 6; j++) {
            if (arr[i][j] === 0) {
                console.log(`i=${i} j=${j}`);
                soved = false
                let tempArr = []
                for (let k = 0; k < 6; k++) {
                    if (arr[i][k] !== 0) {
                        console.log(`tempArr.push(arr[${i}][${k}])`, arr[i][k]);
                        tempArr.push(arr[i][k])
                    }
                }
                for (let l = 0; l < 6; l++) {
                    if (arr[l][j] !== 0) {
                        console.log(`tempArr.push(arr[${l}][${j}])`, arr[l][j]);
                        tempArr.push(arr[l][j])
                    }
                }
                let spaceNum = whitchPalace(i, j)
                console.log('spaceNum:', spaceNum);
                for (var n = 0; n < 6; n++) {
                    if (palace[spaceNum][n] !== 0) {
                        console.log('palace[spaceNum][n]:', palace[spaceNum][n]);
                        tempArr.push(palace[spaceNum][n])
                    }
                    // console.log(palace[spaceNum]);
                }
                let remainder = quchong(tempArr)
                console.log('remainder:', remainder);
                if (remainder.length === 5) {
                    for (let m = 1; m < 7; m++) {
                        if (!remainder.includes(m)) {
                            arr[i][j] = m
                            console.log(`arr[${i}][${j}] = ${arr[i][j]}`);
                            break
                        }
                    }
                }
            }
        }
    }
    // if (soved) {
    //     return arr
    // } else {
    //     console.log(arr);
    //     sove6(arr)
    // }
    console.log(arr);
    return arr
}

function solution6(arr) {
    let num = 0
    let b = [
        [0, 2, 1, 0, 3, 0],
        [3, 0, 0, 6, 0, 1],
        [0, 1, 0, 0, 0, 2],
        [2, 0, 0, 0, 1, 0],
        [4, 0, 2, 0, 0, 3],
        [0, 3, 0, 2, 6, 0]
    ]
    // console.log(arr);
    // for (let i = 0; i < 6; i++) {
    //     for (let j = 0; j < 6; j++) {
    //         a[i][j] = arr[num++]
    //     }
    // }
    console.log(b);

    sove6(sove6(sove6(sove6(sove6(sove6(sove6(b)))))))
    // sove4(a)
    // sove4(a)
    // sove4(a)
    // sove4(a)
    // sove4(a)
    // sove4(a)
}

const __main = function() {
    solution6(example6)
}

__main()
