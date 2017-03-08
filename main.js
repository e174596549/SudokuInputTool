var board4 = [, , , , , , , , , , , , , , ,
    undefined
]
var board6 = [, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , ,
    undefined
]
var board9 = [, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , ,
    undefined
]
var board5 = [, , , , , , , , , , , , , , , , , , , , , , , ,
    undefined
]
var board7 = [, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , ,
    undefined
]
//NOTE: if last cell of board is empty 'undefined' has to be used as value!
var model = 0
var clickedNumber = 0
var clickClassList = [
    'red',
    'blue',
    'yellow',
    'green',
    'gray',
    'maroon',
    'palevioletred',
    'indigo',
    'saddlebrown',
    'darkgoldenrod',
    'darkslategray',
    'royalblue',
    'dimgray',
    'darkred',
    'tomato',
    'wheat',
    'aquamarine',
    'skyblue',
    'blueviolet',
    'thistle',
    'gainsboro',
    'coral',
    'peru',
    'tan'
]

function checkClass() {
    $('.sudoku-board').unbind('mousedown')
    $('input').unbind('mouseover')
    $('body').unbind('mouseup')
    $("input").focus(function(e) {
        let inputCell = e.target.parentElement
        //	console.log('inputCell ', e.target)
        for (let i = 0; i < clickClassList.length; i++) {
            //console.log('cell.classList', cell.classList)
            if (inputCell.classList.contains(clickClassList[i])) {
                inputCell.classList.remove(clickClassList[i])
            }
        }
        if (!inputCell.classList.contains(clickClassList[clickedNumber]) && inputCell.classList.contains('sudoku-board-cell')) {
            inputCell.classList.add(clickClassList[clickedNumber])
        }
        console.log(clickClassList[clickedNumber])
        // $(this).parentElement.toggleClass(clickClassList[clickedNumber])
    })
    //$('.sudoku-board').addClass("hover")  	$(".sudoku-board-cell").attr({readonly: "readonly"})
    $('.sudoku-board').on('mousedown', (event) => {
        let cell = event.target
        //console.log(cell.classList)  console.log('cell.classList', cell.classList)  if (!cell.classList.contains('red') && cell.classList.contains('sudoku-board-cell')) { 	cell.classList.add('red') } console.log('mousedown event.target', event.target)
        $('input').bind('mouseover', (event) => {
            let cell = event.target.parentElement
            console.log('mouseover cell', cell)
            for (let i = 0; i < clickClassList.length; i++) {
                //console.log('cell.classList', cell.classList)
                if (cell.classList.contains(clickClassList[i])) {
                    cell.classList.remove(clickClassList[i])
                }
            }
            if (!cell.classList.contains(clickClassList[clickedNumber]) && cell.classList.contains('sudoku-board-cell')) {
                cell.classList.add(clickClassList[clickedNumber])
            }
        })
    })
    $('body').on('mouseup', (event) => {
        //console.log('mouseup event.target', event.target)
        $('input').unbind('mouseover')
        console.log(event.target.parentElement);
        if (event.target.parentElement.classList.contains("sudoku-board-cell")) {
            clickedNumber++
            console.log('clickedNumber:', clickedNumber)
            if (clickedNumber >= clickClassList.length) {
                clickedNumber = 0
            }
        }
    })
}
var clearBoardValue = function() {
    let boardArr = $('.sudoku-board').find('input')
    for (var i = 0; i < boardArr.length; i++) {
        boardArr[i].value = ''
    }
}

// function showInput() { 	// $('#id-input-content').on('onkeydown', (event) => { 	console.log(event)  }) console.log($('#id-input-content'))  	let input = $('#id-input-content')  	input.on('onkeydown', (event) => { 		console.log(event)  	}) }
function noNumbers(e) {
    // var keynum
    // var keychar
    //
    // keynum = window.event ?
    //     e.keyCode :
    //     e.which
    // keychar = String.fromCharCode(keynum)
    //alert(keynum + ':' + keychar)  	console.log(document.getElementById("id-input-content").value)  console.log(textArr)
    var saveArr = []
    if (model === 2) {
        var textArr = document.getElementById("id-input-content").value.split(' ')
        var boardArr = $('.sudoku-board').find('input')
        console.log(textArr)
    } else {
        var textArr = document.getElementById("id-input-content").value.split('')
        var boardArr = $('.sudoku-board').find('input')
    }
    for (let i = 0; i < boardArr.length; i++) {
        //	console.log(boardArr[i].parentElement.classList)
        if (textArr[i] == undefined || textArr[i] == '0') {
            boardArr[i].value = ''
        } else {
            boardArr[i].value = textArr[i]
        }
    }
}

function inputAgain() {
    $('input').unbind('blur')
    $("input").blur(function(e) {
        //console.log('blur e.target', e.target)
        var textArr = document.getElementById("id-input-content").value.split('')
        var boardArr = $('.sudoku-board').find('input')
        //console.log(textArr)
        var saveArr = []
        for (let i = 0; i < boardArr.length; i++) {
            //	console.log(boardArr[i].parentElement.classList)
            if (boardArr[i].value == '') {
                saveArr.push('0')
                continue
            }
            saveArr.push(boardArr[i].value)
        }
        //console.log('inputAgain saveArr:', saveArr)
        if (model === 2) {
            document.getElementById("id-input-content").value = saveArr.join(' ')
        } else {
            document.getElementById("id-input-content").value = saveArr.join('')
        }

    })
}

$clearBoardBtn = $(".js-clear-board-btn")
$clearColorBtn = $(".js-clear-color-btn")
$clearInputBtn = $('.js-clear-input-btn')
$clearAllBtn = $('.js-clear-All-btn')
$areaSelect = $(".js-area-area")

$clearColorBtn.on("click", (event) => {
    //	console.log($('.red .green .black .yellow .blue'))
    for (let i = 0; i < clickClassList.length; i++) {
        $(`.${clickClassList[i]}`).removeClass(clickClassList[i])
    }
    $("input").unbind('focus')
    $('.sudoku-board').unbind('mousedown')
    $('body').unbind('mouseup')
})
$clearInputBtn.on('click', (e) => {
    //console.log('clearInputBtn')
    document.getElementById("id-input-content").value = ''
})
$clearAllBtn.on('click', () => {
    if ($clearBoardBtn) {
        $clearBoardBtn.click()
    }
    if ($clearColorBtn) {
        $clearColorBtn.click()
    }
    if ($clearInputBtn) {
        $clearInputBtn.click()
    }

})
$areaSelect.on("click", () => {
    //console.log('areaSelect')
    checkClass()
})
$(".js-create-board-4").on("click", () => {
    $clearAllBtn.click()
    model = 0
    $('#sudoku').children().remove()
    mySudokuJS = $("#sudoku").sudokuJS({
        board: board4
    })
    $clearBoardBtn.on("click", mySudokuJS.clearBoard)
    $(".js-solve-step-btn").on("click", mySudokuJS.solveStep)
    $(".js-solve-all-btn").on("click", mySudokuJS.solveAll)
    inputAgain()
    // showInput()
})
$(".js-create-board-6").on("click", () => {
    model = 0
    $clearAllBtn.click()
    $('#sudoku').children().remove()
    mySudokuJS = $("#sudoku").sudokuJS({
        board: board6
    })
    $clearBoardBtn.on("click", mySudokuJS.clearBoard)
    $(".js-solve-step-btn").on("click", mySudokuJS.solveStep)
    $(".js-solve-all-btn").on("click", mySudokuJS.solveAll)
    inputAgain()
})
$(".js-create-board-9").on("click", () => {
    model = 0
    $clearAllBtn.click()
    $('#sudoku').children().remove()
    mySudokuJS = $("#sudoku").sudokuJS({
        board: board9
    })
    $clearBoardBtn.on("click", mySudokuJS.clearBoard)
    $(".js-solve-step-btn").on("click", mySudokuJS.solveStep)
    $(".js-solve-all-btn").on("click", mySudokuJS.solveAll)
    inputAgain()
})
$(".js-create-board-5").on("click", () => {
    model = 1
    $clearAllBtn.click()
    $('#sudoku').children().remove()
    try {
        mySudokuJS = $("#sudoku").sudokuJS({
            board: board5
        })
    } catch (e) {} finally {}
    $clearBoardBtn.on("click", clearBoardValue)
    inputAgain()
})
$(".js-create-board-7").on("click", () => {
    model = 1
    $clearAllBtn.click()
    $('#sudoku').children().remove()
    try {
        mySudokuJS = $("#sudoku").sudokuJS({
            board: board7
        })
    } catch (e) {} finally {}
    $clearBoardBtn.on("click", clearBoardValue)
    inputAgain()
})

$('.js-create-board-killer').on('click', () => {
    model = 2
    $clearAllBtn.click()
    $('#sudoku').children().remove()
    try {
        mySudokuJS = $("#sudoku").sudokuJS({
            board: board6
        })
    } catch (e) {} finally {}
    $clearBoardBtn.on("click", clearBoardValue)
    inputAgain()
})

$(".js-save-board-btn").on('click', () => {
    //console.log('mySudokuJS', mySudokuJS.getBoard()) console.log('mySudokuJS', mySudokuJS)
    var boardArr = $('.sudoku-board').find('input')
    var saveArr = []
    for (let i = 0; i < boardArr.length; i++) {
        //	console.log(boardArr[i].parentElement.classList)
        if (model == 0) {
            saveArr.push(boardArr[i].value)
        } else {
            for (let j = 0; j < clickClassList.length; j++) {
                if (boardArr[i].parentElement.classList.contains(clickClassList[j])) {
                    saveArr.push([j, boardArr[i].value])
                }
            }
        }
    }
    console.log(saveArr)
})
