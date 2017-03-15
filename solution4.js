let example4 = [
    0, 1, 0, 0,
    2, 0, 3, 0,
    0, 3, 0, 2,
    0, 0, 1, 0
]

let quchong = function(arr) {
    var newArr = Array.from(new Set(arr))
    for (var i = 0; i < newArr.length; i++) {
        newArr[i] = parseInt(newArr[i])
    }
    return newArr
}

function whitchPalace(i, j) {
    if (i < 2) {
        if (j < 2) {
            return 0
        } else {
            return 1
        }
    } else {
        if (j < 2) {
            return 2
        } else {
            return 3
        }
    }
}

function sove4(arr) {
    let num = 0
    var soved = true
    let palace = [
        [arr[0][0], arr[0][1], arr[1][0], arr[1][1]],
        [arr[0][2], arr[0][3], arr[1][2], arr[1][3]],
        [arr[2][0], arr[2][1], arr[3][0], arr[3][1]],
        [arr[2][2], arr[2][3], arr[3][2], arr[3][3]]
    ]
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            if (arr[i][j] === 0) {
                soved = false
                let tempArr = []
                for (let k = 0; k < 4; k++) {
                    if (arr[i][k] !== 0) {
                        tempArr.push(arr[i][k])
                    }
                }
                for (let l = 0; l < 4; l++) {
                    if (arr[l][j] !== 0) {
                        tempArr.push(arr[l][j])
                    }
                }
                let spaceNum = whitchPalace(i, j)
                console.log('spaceNum:', spaceNum);
                for (var n = 0; n < 4; n++) {
                    if (palace[spaceNum][n] !== 0) {
                        console.log('palace[spaceNum][n]:', palace[spaceNum][n]);
                        tempArr.push(palace[spaceNum][n])
                    }
                    // console.log(palace[spaceNum]);
                }
                let remainder = quchong(tempArr)
                console.log('remainder:', remainder);
                if (remainder.length === 3) {
                    for (let m = 1; m < 5; m++) {
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
    if (soved) {
        return arr
    } else {
        console.log(arr);
        sove4(arr)
    }
    // console.log(arr);
    // return arr
}

function solution4(arr) {
    let num = 0
    let a = [
        [],
        [],
        [],
        []
    ]
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            a[i][j] = arr[num++]
        }
    }
    console.log(a);
    // sove4(sove4(sove4(a)))
    sove4(a)
    // sove4(a)
    // sove4(a)
    // sove4(a)
    // sove4(a)
    // sove4(a)
    // sove4(a)
}

const __main = function() {
    solution4(example4)
}

__main()
