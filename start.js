var express = require('express');
var app = express();
var iconv = require('iconv-lite');
var path = require('path');
var os = require('os')
var fs = require('fs');



function getElectronFolder() {
    var version = "0.37.5";
    return `electron-${version}-${os.platform()}-${os.arch()}`;
}

function getElectronFileName() {
    if (os.platform() == "win32") {
        return "electron.exe";
    }
    else if (os.platform() == "darwin") {
        return "Electron.app/Contents/MacOS/Electron";
    }
    else {
        throw `unsupport electron platform : ${os.platform()}`;
    }
}

var root = process.argv[2];
if (!root) {
    throw 'no root path!';
}

if (root == 'electron') {
    openElectron();
}
else {
    openExpressServer();
}

function openElectron() {
    var electronPath = path.join(getElectronFolder(), getElectronFileName());
    //检测 electron 是否存在
    if (fs.existsSync(electronPath)) {
        console.log(1)
    }
    else {
        throw `electron not found !!\nplease download and install electron in ${electronPath} at first`;
    }
}

function openExpressServer() {
    app.get('/', typescriptCompiler);

    app.use(express.static(root));
    var server = app.listen(3000, () => {
        var host = server.address().address;
        var port = server.address().port;

        console.log('Example app listening at http://%s:%s', host, port);
    });

}



function typescriptCompiler(req, res, next) {
    var spawn = require('child_process').spawn;
    var tsc_path;
    if (os.platform() == 'win32') {
        tsc_path = path.join('node_modules', '.bin', 'tsc.cmd');
    }
    else {
        tsc_path = path.join('node_modules', '.bin', 'tsc');
    }
    var tsc = spawn(tsc_path, ['-p', root]);
    var errorMessage = "";
    // 捕获标准输出并将其打印到控制台
    tsc.stdout.on('data', function(data) {
        errorMessage += data;
    });
    // 捕获标准输出并将其打印到控制台
    tsc.stderr.on('data', function(data) {

        var buffer = new Buffer(data);
        var str = iconv.decode(buffer, 'gbk');;
        console.log(str)
        errorMessage += str;
    });

    // 注册子进程关闭事件
    tsc.on('exit', function(code, signal) {
        if (code == 0) {
            next();
        }
        else {
            var message = "<p>TypeScript编译错误</p>";
            message += "<p>" + errorMessage + "</p>";
            res.send(message);
        }
    });
}