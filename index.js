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
//模式 0：4、6、9 模式 1：5、7 模式 2：killer
var model = 0
//点击次数决定颜色
var clickedNumber = 0
//备选颜色列表
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
//区域颜色选择函数
function checkClass() {
    $('.sudoku-board').unbind('mousedown')
    $('input').unbind('mouseover')
    $('body').unbind('mouseup')
    //选中变色函数
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
        //console.log(clickClassList[clickedNumber])
        //console.log(event.target.parentElement);
        // $(this).parentElement.toggleClass(clickClassList[clickedNumber])
    })
    //$('.sudoku-board').addClass("hover")  	$(".sudoku-board-cell").attr({readonly: "readonly"})
    //划过区域变色函数
    $('.sudoku-board').on('mousedown', (event) => {
        let cell = event.target
        //单击计后数器+1
        clickedNumber++
        console.log('clickedNumber:', clickedNumber)
        //计数器超长后清零
        if (clickedNumber >= clickClassList.length) {
            clickedNumber = 0
        }
        //console.log(cell.classList)  console.log('cell.classList', cell.classList)  if (!cell.classList.contains('red') && cell.classList.contains('sudoku-board-cell')) { 	cell.classList.add('red') } console.log('mousedown event.target', event.target)
        //划过区域变色实现
        $('input').bind('mouseover', (event) => {
            let cell = event.target.parentElement
            console.log('mouseover cell', cell)
            //清除之前颜色
            for (let i = 0; i < clickClassList.length; i++) {
                //console.log('cell.classList', cell.classList)
                if (cell.classList.contains(clickClassList[i])) {
                    cell.classList.remove(clickClassList[i])
                }
            }
            //添加新颜色
            if (!cell.classList.contains(clickClassList[clickedNumber]) && cell.classList.contains('sudoku-board-cell')) {
                cell.classList.add(clickClassList[clickedNumber])
            }
        })
    })
    //鼠标抬起后选区逻辑结束
    $('body').on('mouseup', (event) => {
        //console.log('mouseup event.target', event.target)
        $('input').unbind('mouseover')
    })
}
//清除棋盘中的所有值
var clearBoardValue = function() {
    let boardArr = $('.sudoku-board').find('input')
    for (var i = 0; i < boardArr.length; i++) {
        boardArr[i].value = ''
    }
}

// function showInput() { 	// $('#id-input-content').on('onkeydown', (event) => { 	console.log(event)  }) console.log($('#id-input-content'))  	let input = $('#id-input-content')  	input.on('onkeydown', (event) => { 		console.log(event)  	}) }
//输入按键监听事件
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
        //killer模式会出现两位数字 输入时需要 多输入一个空格 以分割
        var textArr = document.getElementById("id-input-content").value.split(' ')
        var boardArr = $('.sudoku-board').find('input')
        console.log(textArr)
    } else {
        //其他模式不需要分隔符
        var textArr = document.getElementById("id-input-content").value.split('')
        var boardArr = $('.sudoku-board').find('input')
    }
    //将输入的字符显示在棋盘上
    for (let i = 0; i < boardArr.length; i++) {
        //	console.log(boardArr[i].parentElement.classList)
        if (textArr[i] == undefined || textArr[i] == '0') {
            boardArr[i].value = ''
        } else {
            boardArr[i].value = textArr[i]
        }
    }
}
//将棋盘上的字符 与输入框中的字符同步
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
//清除按钮
$clearBoardBtn = $(".js-clear-board-btn")
$clearColorBtn = $(".js-clear-color-btn")
$clearInputBtn = $('.js-clear-input-btn')
$clearAllBtn = $('.js-clear-All-btn')
$areaSelect = $(".js-area-area")

//清除当前所有颜色
$clearColorBtn.on("click", (event) => {
    //	console.log($('.red .green .black .yellow .blue'))
    for (let i = 0; i < clickClassList.length; i++) {
        $(`.${clickClassList[i]}`).removeClass(clickClassList[i])
    }
    $("input").unbind('focus')
    $('.sudoku-board').unbind('mousedown')
    $('body').unbind('mouseup')
})
//清除输入框内容
$clearInputBtn.on('click', (e) => {
    //console.log('clearInputBtn')
    document.getElementById("id-input-content").value = ''
})
//全部清除
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
//绑定区域颜色选择事件
$areaSelect.on("click", () => {
    //console.log('areaSelect')
    checkClass()
})
//生成棋盘事件
$(".js-create-board-4").on("click", () => {
    $clearAllBtn.click()
    $clearBoardBtn.unbind("click")
    model = 0
    $('#sudoku').children().remove()
    mySudokuJS = $("#sudoku").sudokuJS({
        board: board4
    })
    $clearBoardBtn.on("click", mySudokuJS.clearBoard)
    $clearAllBtn.click()
    $(".js-solve-step-btn").on("click", mySudokuJS.solveStep)
    $(".js-solve-all-btn").on("click", mySudokuJS.solveAll)
    inputAgain()
    // showInput()
})
$(".js-create-board-6").on("click", () => {
    $clearAllBtn.click()
    $clearBoardBtn.unbind("click")
    model = 0
    $('#sudoku').children().remove()

    try {
        mySudokuJS = $("#sudoku").sudokuJS({
            board: board6
        })
    } catch (e) {
        console.log(e);
    } finally {}
    $clearBoardBtn.on("click", clearBoardValue)
    $clearAllBtn.click()
    // $(".js-solve-step-btn").on("click", mySudokuJS.solveStep)
    // $(".js-solve-all-btn").on("click", mySudokuJS.solveAll)
    inputAgain()
})
$(".js-create-board-9").on("click", () => {
    $clearAllBtn.click()
    $clearBoardBtn.unbind("click")
    model = 0
    $('#sudoku').children().remove()
    mySudokuJS = $("#sudoku").sudokuJS({
        board: board9
    })
    $clearBoardBtn.on("click", mySudokuJS.clearBoard)
    $clearAllBtn.click()
    $(".js-solve-step-btn").on("click", mySudokuJS.solveStep)
    $(".js-solve-all-btn").on("click", mySudokuJS.solveAll)
    inputAgain()
})
$(".js-create-board-5").on("click", () => {
    model = 1
    $clearAllBtn.click()
    $clearBoardBtn.unbind("click")
    $('#sudoku').children().remove()
    try {
        mySudokuJS = $("#sudoku").sudokuJS({
            board: board5
        })
    } catch (e) {
        console.log(e);
    } finally {}
    $clearBoardBtn.on("click", clearBoardValue)
    $clearAllBtn.click()
    inputAgain()
})
$(".js-create-board-7").on("click", () => {
    model = 1
    $clearAllBtn.click()
    $clearBoardBtn.unbind("click")
    $('#sudoku').children().remove()
    try {
        mySudokuJS = $("#sudoku").sudokuJS({
            board: board7
        })
    } catch (e) {
        console.log(e);
    } finally {}
    $clearBoardBtn.on("click", clearBoardValue)
    $clearAllBtn.click()
    inputAgain()
})
$('.js-create-board-killer').on('click', () => {
    model = 2
    $clearAllBtn.click()
    $clearBoardBtn.unbind("click")
    $('#sudoku').children().remove()
    try {
        mySudokuJS = $("#sudoku").sudokuJS({
            board: board6
        })
    } catch (e) {
        console.log(e);
    } finally {}
    $clearBoardBtn.on("click", clearBoardValue)
    $clearAllBtn.click()
    inputAgain()
})
//保存信息  以棋盘内容为准
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
//TODO 发送已存信息
