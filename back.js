var http = require('http');
// var querystring = require('querystring');
// var util = require('util');
var url = require('url')

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
    else if (pathname == '/stuPage') {
        let getstu = myURL.searchParams.get('getstu')
        //console.log(myURL.searchParams.get('getstu') ) 
        console.log(getstu)
        data = {
            "Sname": 'Sname',
            "Sno": "Sno",
            "Sdept": "Sdept",
            "Teacher": "Teacher"
        }
        setTimeout(function(){
            res.writeHead(200, { 'Content-type': 'application/json' });
            res.end(JSON.stringify(data))
        },2000)
    }
    else if (pathname == '/stuPage/checkResult') {
        let getstu = myURL.searchParams.get('getstu')
        //console.log(myURL.searchParams.get('getstu') ) 
        console.log(getstu)
        res.writeHead(200, { 'Content-type': 'application/json' });
        data = {
            "PaperNo": "PaperNo",
            "Title": "Title",
            "Checkin": "通过",
            "Status":"Status"
        }
        res.end(JSON.stringify(data))
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