var http = require('http');
// var querystring = require('querystring');
// var util = require('util');
var url=require('url')
var oracledb = require('oracledb');
        var config = {
          user:'ZY',　　
          password:'123456',　
          connectString : "127.0.0.1:1521/XE"
      };

http.createServer(function (req, res) {
    //获取post请求中的参数
    var myURL = new URL(req.url,'http://localhost:8081/');
    var pathname = myURL.pathname;
     console.log(myURL)
//    console.log(myURL.searchParams.get('a') ) 
if (pathname == '/') {
    res.writeHead(200, {
        'Content-Type': 'text/plain'
    });
    res.end('Home Page\n');
}
else if (pathname == '/login') {
    console.log("studentlogin")
    let data = []

    req.on('data', chunk => {
            data.push(chunk)  // 将接收到的数据暂时保存起来
        })
    req.on('end', () => {
        data = JSON.parse(data)
        console.log(data) // 数据传输完，打印数据的内容

        
      oracledb.getConnection(
          config,
          function(err, connection)
          {
            if (err) {
              console.error(err.message);
              return;
          }

          if(data.role==1){
            var sql='SELECT * FROM STUDENT WHERE sno='+data.user +'AND password='+data.passwd+'AND rownum=1'
          }
          else if(data.role==2){
            var sql='SELECT * FROM TEACHER WHERE tno='+data.user +'AND password='+data.passwd+'AND rownum=1'
          }
          else if(data.role==3){
            var sql='SELECT * FROM MANAGER WHERE mno='+data.user +'AND password='+data.passwd+'AND rownum=1'
          }
          connection.execute(sql,
            function(err, result)
              {
                if (err) {
                  console.error(err.message);
                  //doRelease(connection);
                  return;
              }
              console.log("连接成功")
              //console.log(result);
            mdata={}
            if(result.rows.length>0){
                mdata['LoginPass']=true
            }
            else{
                mdata['LoginPass']=false
            }
            console.log(result.metaData);
            console.log(result.rows);
            res.writeHead(200, { 'Content-type': 'application/json' });
            res.end(JSON.stringify(mdata))
            console.log(mdata)
        });
        });
      })

      
}
else if(pathname == '/stuPage'){
    console.log("stupage")
    let getstu=myURL.searchParams.get('getstu')
    //console.log(myURL.searchParams.get('getstu') ) 
    console.log(getstu)

      oracledb.getConnection(config,
          function(err, connection)
          {
            if (err) {
              console.error(err.message);
              return;
          }
          var stu_sql='SELECT sname,sno,sdept,t.tname FROM STUDENT s,TEACHER t WHERE s.tno=t.tno AND sno='+getstu+'AND rownum=1'
          connection.execute(stu_sql,
            function(err, result)
              {
                if (err) {
                  console.error(err.message);
                  //doRelease(connection);
                  return;
              }
              console.log("查询成功")
              //console.log(result);
            console.log(result.metaData);
            console.log(result.rows[0]);
            res.writeHead(200, { 'Content-type': 'application/json' });
            data={
                "Sname":result.rows[0][0],
                "Sno":result.rows[0][1],
                "Sdept":result.rows[0][2],
                "Teacher":result.rows[0][3]
            }
            res.end(JSON.stringify(data))
            //console.log(mdata)
        });
        });
  }
else if(pathname == '/stuPage/uploadArticle'){
/*    let getstu=myURL.searchParams.get('getstu')
    let getper=myURL.searchParams.get('getper')
    
    //console.log(myURL.searchParams.get('getstu') ) 
    console.log(getper)

      oracledb.getConnection(config,
          function(err, connection)
          {
            if (err) {
              console.error(err.message);
              return;
          }
          var stu_per='update student set title='+gettitle+'where sno='+getstu
          //var stu_sql='SELECT sname,sno,sdept,t.tname FROM STUDENT s,TEACHER t WHERE s.tno=t.tno AND sno='+getstu
          connection.execute(stu_sql,
            function(err, result)
              {
                if (err) {
                  console.error(err.message);
                  //doRelease(connection);
                  return;
              }
              console.log("查询成功")
              //console.log(result);
            console.log(result.metaData);
            console.log(result.rows);
            res.writeHead(200, { 'Content-type': 'application/json' });
            res.end(JSON.stringify(result.rows))
            //console.log(mdata)
        });
        });*/
    console.log("success");
    let getpaper = {}
    
    req.on('data', chunk => {
            getpaper.push(chunk)  // 将接收到的数据暂时保存起来
        })
    req.on('end', () => {
        getpaper = JSON.parse(getpaper)
        console.log(getpaper) // 数据传输完，打印数据的内容

        
      oracledb.getConnection(
          config,
          function(err, connection)
          {
            if (err) {
              console.error(err.message);
              return;
          }
          var sql='SELECT * FROM STUDENT WHERE sno='+getpaper.user +'AND password='+getpaper.passwd
          connection.execute(sql,
            function(err, result)
              {
                if (err) {
                  console.error(err.message);
                  //doRelease(connection);
                  return;
              }
              /*console.log("连接成功")
              console.log(result);
            console.log(result.rows);*/
            res.writeHead(200, { 'Content-type': 'application/json' });
            res.end(JSON.stringify(mdata))
            console.log(mdata)
        });
        });
      })
}      
else if(pathname == '/stuPage/checkResult'){
    console.log("checkResullt")
    let getstu=myURL.searchParams.get('getstu')
    //console.log(myURL.searchParams.get('getstu') ) 
    console.log(getstu)

      oracledb.getConnection(config,
          function(err, connection)
          {
            if (err) {
              console.error(err.message);
              return;
          }
          var stu_sql='SELECT paperno,title,checkin,status FROM STUDENT WHERE sno='+getstu+'AND rownum=1'
          connection.execute(stu_sql,
            function(err, result)
              {
                if (err) {
                  console.error(err.message);
                  //doRelease(connection);
                  return;
              }
              console.log("查询成功")
              //console.log(result);
            console.log(result.metaData);
            console.log(result.rows[0]);
            res.writeHead(200, { 'Content-type': 'application/json' });
            data={
                "PaperNo":result.rows[0][0],
                "Title":result.rows[0][1],
                "Checkin":result.rows[0][2],
                "Status":result.rows[0][3]
            }
            res.end(JSON.stringify(data))
            //console.log(mdata)
        });
        });
}
else if(pathname == '/adminPage'){
    console.log("admin")
    let getstu=myURL.searchParams.get('getstu')
    //console.log(myURL.searchParams.get('getstu') ) 
    console.log(getstu)

      oracledb.getConnection(config,
          function(err, connection)
          {
            if (err) {
              console.error(err.message);
              return;
          }
          let stu_sql='SELECT sno,sname FROM STUDENT WHERE rownum<=10'
          let tea_sql='SELECT tno,tname FROM TEACHER WHERE rownum<=10'
          connection.execute(stu_sql,
            function(err, result)
              {
                if (err) {
                  console.error(err.message);
                  //doRelease(connection);
                  return;
              }
              console.log("查询成功")
              //console.log(result);
            console.log(result.metaData);
            console.log(result.rows[0]);
            res.writeHead(200, { 'Content-type': 'application/json' });
            data={
                "PaperNo":result.rows[0][0],
                "Title":result.rows[0][1],
                "Checkin":result.rows[0][2],
                "Status":result.rows[0][3]
            }
            res.end(JSON.stringify(data))
            //console.log(mdata)
        });
        });
}
else {
    console.log("fail")
    res.writeHead(404, {
        'Content-Type': 'text/plain'
    });
    res.end('Page not found\n');
}
}).listen(8081, function () {
    console.log('服务启动!!!')
})