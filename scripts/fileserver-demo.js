var http = require('http');
var url = require('url');
var fs = require('fs');

var addr = 'http://localhost:8082/jumpstart1.html';

http.createServer(function (req, res) { /* Create server */
    var q = url.parse(req.url, true); /* Parse client URL query */
    console.log(q.pathname);
    var filename = "html/" + q.pathname; /* Construct filepath using parsed query */
    fs.readFile(filename, function(err, data) { /* call readFile module to attempt to read file @ specified filepath */
        if (err) { /* If file not found, respond with 404 */
            res.writeHead(404, {'Content-Type': 'text/html'});
            return res.end("404 Not Found");
        }
        /* Otherwise, respond with 200OK and provide file data */
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(data);
        res.end();
    });
}).listen(8082); /* Listen on port 8080 */
