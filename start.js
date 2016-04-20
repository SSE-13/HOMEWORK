var express = require('express');
var app = express();
var iconv = require('iconv-lite');
var path = require('path');
var os = require('os')
var fs = require('fs');

function getElectronFolder() {
    var version = "v0.37.4";
    return `./electron-${version}-${os.platform()}-${os.arch()}`;
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

if (root.indexOf('map_editor') != -1) {
    openElectron('map_editor');
}
else if ( root.indexOf("gameengine") != -1){
    openElectron('gameengine');
}
else {
    openExpressServer();
}

function openElectron(projectPath) {
    var electronPath = path.join(getElectronFolder(), getElectronFileName());
    //检测 electron 是否存在
    if (fs.existsSync(electronPath)) {
        var electron = createChildProcess(electronPath, [projectPath], function(data) {
        }, function() {

        });


        startTypescriptAutoCompiler();


    }
    else {
        throw `electron not found !!\nplease download and install electron in ${electronPath} at first`;
    }



}


function createChildProcess(cmd, param, onOutput, onExit) {
    var spawn = require('child_process').spawn;
    var command = spawn(cmd, param);
    var errorMessage = "";
    // 捕获标准输出并将其打印到控制台
    command.stdout.on('data', function(data) {
        var buffer = new Buffer(data);
        var str = iconv.decode(buffer, 'gbk');;
        console.log(str)
        onOutput(str);
    });
    // 捕获标准错误并将其打印到控制台
    command.stderr.on('data', function(data) {

        var buffer = new Buffer(data);
        var str = iconv.decode(buffer, 'gbk');;
        console.log(str)
        onOutput(str);
    });
    command.on('exit', onExit);
    return command;

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
function startTypescriptAutoCompiler() {
    
    var tsc_path;
    if (os.platform() == 'win32') {
        tsc_path = path.join('node_modules', '.bin', 'tsc.cmd');
    }
    else {
        tsc_path = path.join('node_modules', '.bin', 'tsc');
    }

    createChildProcess(tsc_path, ["-p", root], function(data) {
        console.log(data);
    }, function(code, signal) {
        if (code == 0) {
            var errorMessage = "";
            createChildProcess(tsc_path, ["-p", root, "-w"], function(data) {
            }, function(code, signal) {
                console.log("TypeScript 编译器致命报错，请重启 Electron");
                process.exit();
            })
        }
    })



}



function typescriptCompiler(req, res, next) {
    var errorMessage = "";
    var tsc_path;
    if (os.platform() == 'win32') {
        tsc_path = path.join('node_modules', '.bin', 'tsc.cmd');
    }
    else {
        tsc_path = path.join('node_modules', '.bin', 'tsc');
    }
    createChildProcess(tsc_path, ["-p", root], function(data) {
        errorMessage += data
    }, function(code, signal) {
        if (code == 0) {
            next();
        }
        else {
            var message = "<p>TypeScript编译错误</p>";
            message += "<p>" + errorMessage + "</p>";
            res.send(message);
        }
    })
}