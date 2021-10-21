var http = require('http');

var LISTEN_ON_PORT = 3000;

function toTitleCase(str) {
    return str.replace(/[a-z]*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
}

http.createServer(function (req, res) {
    var body;

    body = '';
    req.on('data', function(chunk) {
        body += chunk;
    });

    req.on('end', function() {
        console.log(req.method + ' ' + req.url + ' HTTP/' + req.httpVersion);

        for (prop in req.headers) {
            console.log(toTitleCase(prop) + ': ' + req.headers[prop]);
        }

        if (body.length > 0) {
            console.log('\n' + body);
        }
        console.log('');

        res.writeHead(200);
        res.end();
    });

    req.on('err', function(err) {
        console.error(err);
    });
}).listen(LISTEN_ON_PORT, function () {
    console.log('Server listening on port ' + LISTEN_ON_PORT);
});
