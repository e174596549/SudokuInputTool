//以node方式打开
//#!/usr/local/bin/node

//生成1-4随机数
function creatRandomNum4() {
    let r = Math.floor(Math.random() * 4 + 1)
    return r
}

//生成1-6随机数
function creatRandomNum6() {
    let r = Math.floor(Math.random() * 6 + 1)
    return r
}

//验证随机数概率
function test_creatRandomNum() {
    let a = []
    for (let i = 0; i < 1000000; i++) {
        let num = creatRandomNum15()
        if (a[num] === undefined) {
            a[num] = 0
        }
        a[num]++
    }
    console.log(a);
}

//生成0-15之间随机位置
function creatRandomNum15() {
    let r = Math.floor(Math.random() * 16)
    return r
}

//生成0-35之间随机位置
function creatRandomNum35() {
    let r = Math.floor(Math.random() * 36)
    return r
}


//返回生成随机的题目
function creatQuestion() {
    let question = []
    for (let i = 0; i < 12; i++) {
        let num = creatRandomNum35()
        if (question[num] === undefined) {
            question[num] = creatRandomNum6()
        } else {
            i--
        }
    }
    for (let i = 0; i < 36; i++) {
        if (question[i] === undefined) {
            question[i] = '0'
        }
    }
    //console.log(question.join(''));
    return question.join('')
}

//验证题目
function validate(space, mold, str, newStr) {
    //console.log('题目是：', str);
    const spawn = require('child_process').spawn;
    //console.log('__dirname', __dirname);
    const ls = spawn(`./sudoku.check_darwin`, [`${space}`, `${mold}`, str, newStr]);
    //${__dirname}/../../../../../../../../../../Applications/Utilities/Terminal.app`
    let canSave = true

    ls.stdout.on('data', (data) => {
        console.log(`stdout: ${data}`);
    });

    ls.stderr.on('data', (data) => {
        //错误的话继续生成
        //    console.log(`stderr: ${data}`);
        if (data) {
            //alert('题目错误！')
            //console.log('题目错误');
            canSave = false
        } else {


        }
    });

    ls.on('close', (code) => {
        //console.log(`child process exited with code ${code}`);

        //正确的话存入临时数组
        if (canSave) {
            //_saveJSON(`${name}.num`, saveArr)
            //alert('题目正确！')
            // console.log('题目正确');
            problemArr.add(str)
            console.log('题目正确', problemArr.size);
        }
    });
}

//另存题目为相应格式的文件
const _saveJSON = function(path, answers) {
    // 这个函数用来把一个保存了所有对象的数组保存到文件中
    const fs = require('fs')
    const s = JSON.stringify(answers, null, 2)
    fs.writeFile(path, answers, function(error) {
        if (error !== null) {
            console.log('*** 写入文件错误', error)
            //alert('*** 写入文件错误')
        } else {
            console.log('--- 保存成功')
            //alert('--- 保存成功')
        }
    })
}

//批量存储题目到目标格式文件
function toSave(arr) {
    _saveJSON('./data/data6-6-12.json', arr)
    for (var i = 0; i < arr.length; i++) {
        let n = 0
        //题目文件命名序号
        n = i + 200
        if (n < 10) {
            var name = '605100' + n + '.num'
        }
        if (n >= 10 && n < 100) {
            var name = '60510' + n + '.num'
        }
        if (n >= 100) {
            var name = '6051' + n + '.num'
        }
        _saveJSON('./data/data6-6/6-6-12/' + name, 'num:' + arr[i].split('').join(' '))
    }
}

function __main() {
    //test_creatRandomNum()
    //为题目命名：宫数 类型 来源 组别 题目
    problemArr = new Set()

    // let str = creatQuestion()
    // console.log(str);

    let nameArr = [6, 0, 5, 1, '000']
    let timer = setInterval(() => {
        let str = creatQuestion()
        //console.log(str);
        validate(nameArr[0], nameArr[1], str, '')
        //一次生成的题目数量
        if (problemArr.size >= 50) {
            console.log('可使用数据：', problemArr);
            var newArr = Array.from(problemArr)
            console.log('newArr', newArr);
            toSave(newArr)
            clearInterval(timer)
        }
    }, 0)
}

__main()
