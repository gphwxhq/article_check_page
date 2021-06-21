var http = require('http');
// var querystring = require('querystring');
// var util = require('util');
var url = require('url')
var multiparty = require("multiparty");
var fs = require('fs');

http.createServer(function (req, res) {
    //获取post请求中的参数
    var myURL = new URL(req.url, 'http://localhost:8081/');
    var pathname = myURL.pathname;
    // console.log(myURL)
    //    console.log(myURL.searchParams.get('a') ) 
    if (pathname == '/') {
        res.writeHead(200, {
            'Content-Type': 'text/plain'
        });
        res.end('Home Page\n');
    }
    else if (pathname == '/login') {
        let data = []
        req.on('data', chunk => {
            data.push(chunk)  // 将接收到的数据暂时保存起来
        })
        req.on('end', () => {
            data = JSON.parse(data)
            console.log(data) // 数据传输完，打印数据的内容
            let dData = {
                'LoginPass': false
            }
            if (data.user == 1) {
                dData.LoginPass = true
            }
            res.writeHead(200, { 'Content-type': 'application/json' });
            res.end(JSON.stringify(dData))
        })
    }
    else if (pathname == '/stuPage/uploadArticle') {
        let data = []
        req.on('data', chunk => {
            data.push(chunk)  // 将接收到的数据暂时保存起来
        })
        req.on('end', () => {
            data = JSON.parse(data)
            console.log(data) // 数据传输完，打印数据的内容
            let dData = {
                'receive': false
            }
            if (data.user == 1) {
                dData.receive = true
            }
            res.writeHead(200, { 'Content-type': 'application/json' });
            res.end(JSON.stringify(dData))
        })
    }
    else if (pathname == '/stuPage/uploadfile') {
        var form = new multiparty.Form({ uploadDir: './public/images' });
        form.parse(req, function (err, fields, files) {
            console.log(err, fields, files, ' fields2')
            var inputFile = files.file[0];
            var uploadedPath = inputFile.path;
            var dstPath = './public/images/' + inputFile.originalFilename;
            //重命名为真实文件名
            fs.rename(uploadedPath, dstPath, function (err) {console.log(err ) })
        });
        res.writeHead(200, { 'Content-type': 'application/json' });
        res.end(JSON.stringify({'paperFinish':true}))
    }
    else if (pathname == '/stuPage/init') {
        let getstu = myURL.searchParams.get('user')
        //console.log(myURL.searchParams.get('getstu') ) 
        console.log(getstu)
        let data = {
            "userName":"阿巴",
            "handIn":true
        }
        console.log(data)
        setTimeout(function () {
            res.writeHead(200, { 'Content-type': 'application/json' });
            res.end(JSON.stringify(data))
        }, 2000)
    }
    else if (pathname == '/stuPage') {
        let getstu = myURL.searchParams.get('user')
        //console.log(myURL.searchParams.get('getstu') ) 
        console.log(getstu)
        let data = {
            "Sname": 'Sname',
            "Sno": "Sno",
            "Sdept": "Sdept",
            "Teacher": "Teacher"
        }
        setTimeout(function () {
            res.writeHead(200, { 'Content-type': 'application/json' });
            res.end(JSON.stringify(data))
        }, 2000)
    }
    else if (pathname == '/stuPage/checkResult') {
        let getstu = myURL.searchParams.get('user')
        //console.log(myURL.searchParams.get('getstu') ) 
        console.log(getstu)
         let data = {
            "PaperNo": "PaperNo",
            "Title": "Title",
            "Checkin": "通过",
            "Status": "Status"
        }
        setTimeout(function () {
        res.writeHead(200, { 'Content-type': 'application/json' });
        res.end(JSON.stringify(data))
        },2000)
    }
    else if (pathname == '/adminPage') {
        let key = myURL.searchParams.get('keyWords')
        //console.log(myURL.searchParams.get('getstu') ) 
        console.log(key)
         let data = {
            res:[{'no':'123','name':'1'},{'no':'1234','name':'2'},{'no':'123','name':'3'},{'no':'1234','name':'4'},{'no':'123','name':'5'},{'no':'1234','name':'6'},{'no':'123','name':'7'},{'no':'1234','name':'8'},{'no':'123','name':'9'},{'no':'1234','name':'10'},{'no':'123','name':'11'},{'no':'1234','name':'12'},{'no':'123','name':'13'},{'no':'1234','name':'14'},{'no':'123','name':'15'},{'no':'1234','name':'16'},{'no':'123','name':'17'},{'no':'1234','name':'18'},{'no':'123','name':'19'},{'no':'1234','name':'20'},{'no':'123','name':'21'},{'no':'1234','name':'22'}]
        }
        setTimeout(function () {
        res.writeHead(200, { 'Content-type': 'application/json' });
        res.end(JSON.stringify(data))
        },2000)
    }
    else if (pathname=='/adminPage/init'){
        let getstu = myURL.searchParams.get('user')
        //console.log(myURL.searchParams.get('getstu') ) 
        console.log(getstu)
        let data = {
            "userName":"阿巴",
        }
        console.log(data)
        setTimeout(function () {
            res.writeHead(200, { 'Content-type': 'application/json' });
            res.end(JSON.stringify(data))
        }, 2000)
    }
    else if (pathname=='/teacherPage/init'){
        let getstu = myURL.searchParams.get('user')
        //console.log(myURL.searchParams.get('getstu') ) 
        console.log(getstu)
        let data = {
            "userName":"阿巴",
        }
        console.log(data)
        setTimeout(function () {
            res.writeHead(200, { 'Content-type': 'application/json' });
            res.end(JSON.stringify(data))
        }, 2000)
    }
    else {
        res.writeHead(404, {
            'Content-Type': 'text/plain'
        });
        res.end('Page not found\n');
    }

    //     var oracledb = require('oracledb');
    //     var config = {
    //       user:'ZY',　　
    //       password:'123456',　
    //       connectString : "127.0.0.1:1521/XE"
    //   };
    //   oracledb.getConnection(
    //       config,
    //       function(err, connection)
    //       {
    //         if (err) {
    //           console.error(err.message);
    //           return;
    //       }
    //       var sql='SELECT * FROM STUDENT WHERE sno='+data.user +'AND password='+data.passwd
    //       connection.execute(sql,
    //           function(err, result)
    //           {
    //             if (err) {
    //               console.error(err.message);
    //               doRelease(connection);
    //               return;
    //           }
    //           response.send()
    //           console.log("连接成功")
    //           console.log(result);
    //         //console.log(result.metaData);
    //         //console.log(result.rows);
    //     });
    //   });
    //     //
    //     //console.log(strurl.passwd)
}).listen(8081, function () {
    console.log('服务启动!!!')
})