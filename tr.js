const cachedUrl = function(path) {
    const fs = require('fs')
    // 先生成对应的文件
    //const path = options.url.split('/').join('-').split(':').join('-')
    // 先尝试去硬盘中读取这个 url 对应的文件
    fs.readFile(path, 'utf-8', function(err, data) {
        if (err != null) {
            // 读取这个文件失败
            // 读不到的话说明是第一次请求，那么就使用 request
            console.log('error', err);
        } else {
            console.log('读取到缓存的页面', path)
            // 读取到，说明已经下载过了，我们讲直接读取硬盘上的文件
            const response = {
                statusCode: 200,
            }
            let head = data.split('').splice(0, 3)
            let body = data.split('').splice(3)
            console.log(head);
            console.log(body);
            let r = head.join('') + body.join(' ')
            console.log(r);
            _saveJSON(path, r)
        }
    })
}

const _saveJSON = function(path, answers) {
    // 这个函数用来把一个保存了所有对象的数组保存到文件中
    const fs = require('fs')
    //const s = JSON.stringify(answers, null, 2)
    fs.writeFile(path, answers, function(error) {
        if (error !== null) {
            console.log('*** 写入文件错误', error)

        } else {
            console.log('--- 保存成功')

        }
    })
}

var i = 4010001

function tr() {
    setInterval(() => {
        cachedUrl(`./data/${i}.num`)
        i++
    }, 1000)
}

function __main() {
    tr()
}

__main()
