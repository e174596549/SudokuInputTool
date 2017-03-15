/**
 * User: sunny
 * Date: 15-2-2
 * Time: 下午5:28
 */
const spawn = require('child_process').spawn;
const ls = spawn('ls', []);


ls.stdout.on('data', (data) => {
    console.log(`stdout: ${data}`);
});

ls.stderr.on('data', (data) => {
    console.log(`stderr: ${data}`);
});

ls.on('close', (code) => {
    console.log(`child process exited with code ${code}`);
});
