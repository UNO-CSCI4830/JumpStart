var http = require('http');
var url = require('url');
var fs = require('fs');
var process = require('process');
var path = require('path'); /* path module to do filepath manipulations on top of fs module */

/* See a lot of stack overflow suggesting using express() as a way to handle node operations... */

var addr = 'http://localhost:8082/'; /* brings us to the splash page */

console.log(`### SOME DEBUGGING:`);

http.createServer(function (req, res) { /* Create server */

    console.log(req.url);
    var q = url.parse(req.url, true); /* Parse client URL query */
    console.log(q.pathname);

    // var filename = "html/" + q.pathname; /* Construct filepath using parsed query */
    var filename = "html/jumpstart1.html";
    filename = filename.replaceAll("/..", ""); /* to keep the skript kiddies at bay */
    if (fs.existsSync(filename)) {
        var data = fs.readFileSync(filename); /* Pull data from file */
        res.writeHead(200, {'Content-Type': 'text/html'}); /* construct header response */
        res.write(data); /* write datea to response */
        res.end();
    } else { /* If file not found, respond with 404 */
            res.writeHead(404, {'Content-Type': 'text/html'});
            return res.end("<html>404 Not Found</h1>");
    }
        /* Otherwise, respond with 200OK and provide file data */
}).listen(8080); /* Listen on port 8080 */

/* Upon Interrupt... */
process.on('SIGINT', signal => {

    console.log("Caught SIGINT");
    // /* remove tempDir */
    // fs.rmdir(tempDir, (err) => {
    //     if (err) {
    //         console.error(`failure removing ${tempDir}: ${err.code}.`);
    //         return;
    //     }
    // });
    /* and now we remove client race conditions wrt deleteing tempDir! */
    process.exit(0);
});
