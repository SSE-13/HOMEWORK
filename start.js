var express = require('express');
var app = express();


var root = process.argv[2];
if (!root) {
    throw 'no root path!';
}

app.get('/', typescriptCompiler);

app.use(express.static(root));


var server = app.listen(3000, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port);
});

function typescriptCompiler(req, res, next) {
    var spawn = require('child_process').spawn;
    var tsc = spawn('tsc', ['-p',root]);
    var errorMessage = "";
    // 捕获标准输出并将其打印到控制台
    tsc.stdout.on('data', function (data) {
        errorMessage += data;
    });

    // 注册子进程关闭事件
    tsc.on('exit', function (code, signal) {
        if (code == 0){
            next();
        }
        else{
            var message = "<p>TypeScript编译错误</p>";
            message += "<p>" + errorMessage + "</p>";
            res.send(message);
        }
    });
}