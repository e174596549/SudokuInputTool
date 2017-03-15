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
//宫数
var space = 0
//类型
var mold = 0
//来源
var src = 0
//组别
var group = 0
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
        let cellList = event.target.parentElement.classList
        //console.log('target.classList :', event.target.parentElement.classList);
        //单击计后数器+1
        if (cellList.contains('sudoku-board-cell')) {
            clickedNumber++
            //console.log('clickedNumber:', clickedNumber)
            //计数器超长后清零
            if (clickedNumber >= clickClassList.length) {
                clickedNumber = 0
            }
        }
        //console.log(cell.classList)  console.log('cell.classList', cell.classList)  if (!cell.classList.contains('red') && cell.classList.contains('sudoku-board-cell')) { 	cell.classList.add('red') } console.log('mousedown event.target', event.target)
        //划过区域变色实现
        $('input').bind('mouseover', (event) => {
            let cell = event.target.parentElement
            //console.log('mouseover cell', cell)
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
$calculateBtn = $(".js-save-Calculate-btn")

//清除按钮
$clearBoardBtn = $(".js-clear-board-btn")
$clearColorBtn = $(".js-clear-color-btn")
$clearInputBtn = $('.js-clear-input-btn')
$clearAllBtn = $('.js-clear-All-btn')
$areaSelect = $(".js-area-area")
//选择按钮
$source = $(".source")
$group = $(".group")
$number = document.getElementById("id-number")

$calculateBtn.on('click', () => {
    console.log('click calculateBtn');
    const spawn = require('child_process').spawn;
    console.log('__dirname}', __dirname);
    const ls = spawn(`./sudoku.check_darwin`, ["4", "0", "0100301203201043"]);
    //${__dirname}/../../../../../../../../../../Applications/Utilities/Terminal.app`

    ls.stdout.on('data', (data) => {
        console.log(`stdout: ${data}`);
    });

    ls.stderr.on('data', (data) => {
        console.log(`stderr: ${data}`);
        if (data) {
            alert('题目错误！')
        } else {
            alert('题目正确！')
        }
    });

    ls.on('close', (code) => {
        console.log(`child process exited with code ${code}`);
    });
})

$source.on('click', (event) => {
    let buttons = event.target.parentElement.children
    for (var i = 0; i < buttons.length; i++) {
        buttons[i].classList.remove('border')
    }
    console.log(buttons);
    event.target.classList.add("border")
    if (event.target.classList.contains('js-source-0-btn')) {
        src = 0
    } else if (event.target.classList.contains('js-source-1-btn')) {
        src = 1
    } else if (event.target.classList.contains('js-source-2-btn')) {
        src = 2
    } else if (event.target.classList.contains('js-source-3-btn')) {
        src = 3
    } else if (event.target.classList.contains('js-source-4-btn')) {
        src = 4
    }
    console.log(src);
})
$group.on('click', (event) => {
    let buttons = event.target.parentElement.children
    for (var i = 0; i < buttons.length; i++) {
        buttons[i].classList.remove('border')
    }
    console.log(buttons);
    event.target.classList.add("border")
    if (event.target.classList.contains('js-group-0-btn')) {
        group = 0
    } else if (event.target.classList.contains('js-group-1-btn')) {
        group = 1
    } else if (event.target.classList.contains('js-group-2-btn')) {
        group = 2
    } else if (event.target.classList.contains('js-group-3-btn')) {
        group = 3
    }
    console.log(group);
})
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
    space = 4
    mold = 0
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
    space = 6
    mold = 0
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
    space = 9
    mold = 0
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
    space = 5
    mold = 1
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
    space = 7
    mold = 1
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
    space = 6
    mold = 3
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
$('.js-create-board-diagonal').on('click', (e) => {
    console.log(e.target.classList);
    if (e.target.classList.contains('border')) {
        e.target.classList.remove('border')
    } else {
        e.target.classList.add('border')
    }
})

//保存信息  以棋盘内容为准
$(".js-save-board-btn").on('click', () => {
    //console.log('mySudokuJS', mySudokuJS.getBoard()) console.log('mySudokuJS', mySudokuJS)
    let diagonal = document.querySelector('.js-create-board-diagonal')
    console.log('对角线', diagonal);
    if (diagonal.classList.contains('border')) {
        mold = 2
    }
    var boardArr = $('.sudoku-board').find('input')
    var saveArr = 'num:'
    var saveClassList = '\narea:'
    for (let i = 0; i < boardArr.length; i++) {
        //	console.log(boardArr[i].parentElement.classList)
        if (model == 0) {
            if (boardArr[i].value === '') {
                saveArr = saveArr + ' ' + 0
            } else {
                saveArr = saveArr + ' ' + boardArr[i].value
            }
            //saveArr.push(Number(boardArr[i].value))
        }
        if (model == 1) {
            if (boardArr[i].value === '') {
                saveArr = saveArr + ' ' + 0
            } else {
                saveArr = saveArr + ' ' + boardArr[i].value
            }
            for (let j = 0; j < clickClassList.length; j++) {
                if (boardArr[i].parentElement.classList.contains(clickClassList[j])) {
                    //saveArr.push([j, Number(boardArr[i].value)])
                    saveClassList = saveClassList + ' ' + j
                }
            }
        }
        if (model == 2) {
            if (boardArr[i].value === '') {
                saveArr = saveArr + ' ' + 0
            } else {
                saveArr = saveArr + ' ' + boardArr[i].value
            }
            for (let j = 0; j < clickClassList.length; j++) {
                if (boardArr[i].parentElement.classList.contains(clickClassList[j])) {
                    //saveArr.push([j, Number(boardArr[i].value)])
                    saveClassList = saveClassList + ' ' + j
                }
            }
        }
    }

    if (model != 0) {
        saveArr += saveClassList
    }

    console.log(saveArr)
    var fs = require('fs');

    fs.mkdir(`${__dirname}/../../../data`, 0777, function(err) {
        if (err) {
            console.log(err);
        } else {
            console.log("creat done!");
        }
    })
    //题目
    let num = $number.value
    //console.log('num', $number.value);
    let name = `${space}${mold}${src}${group}${num}`
    console.log(name);
    _saveJSON(`${__dirname}/../../.././data/${name}.num`, saveArr)
    //    console.log(__dirname)
})
//TODO 发送已存信息

const cachedUrl = function(options, callback) {
    const fs = require('fs')
    // 先生成对应的文件
    const path = options.url.split('/').join('-').split(':').join('-')
    // 先尝试去硬盘中读取这个 url 对应的文件
    fs.readFile(path, function(err, data) {
        if (err != null) {
            // 读取这个文件失败
            // 读不到的话说明是第一次请求，那么就使用 request
            request(options, function(error, response, body) {
                // 下载好了之后，保存到本地文件
                // TODO, 应该下载成功之后再保存
                writeToFile(path, body)
                callback(error, response, body)
            })
        } else {
            log('读取到缓存的页面', path)
            // 读取到，说明已经下载过了，我们讲直接读取硬盘上的文件
            const response = {
                statusCode: 200,
            }
            callback(null, response, data)
        }
    })
}

const _saveJSON = function(path, answers) {
    // 这个函数用来把一个保存了所有对象的数组保存到文件中
    const fs = require('fs')
    const s = JSON.stringify(answers, null, 2)
    fs.writeFile(path, answers, function(error) {
        if (error !== null) {
            console.log('*** 写入文件错误', error)
            alert('*** 写入文件错误')
        } else {
            console.log('--- 保存成功')
            alert('--- 保存成功')
        }
    })
}
