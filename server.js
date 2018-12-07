var http = require('http');
var url = require('url');
var fs = require('fs');

http.createServer(function(req, res){
    var q = url.parse(req.url, true);
    var filename = 'index.html';
    if(q.pathname != '/'){
        filename = '.' + q.pathname;
    }
    console.log(filename);
    fs.readFile(filename, function(err, data){
        if (err) {
          res.writeHead(404, {'Content-Type': 'text/html'});
          return res.end("404 Not Found");
        }  
        res.write(data);
        res.end();
    })
}).listen(8070);