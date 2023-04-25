const http = require('http');
const https = require('https');
const url = require('url');
const grab = require('./grab');

const hostname = grab('host') || '0.0.0.0'; // the hostname you want to listen on
const port = grab('port') || 80; // the port you want to listen on

// create an HTTP server
const server = http.createServer((req, res) => {

    // make a request to "resup.ir"
    let request = url.parse(req.url, true).query
    let QrId = request['qr-id']
    let ResturantName = url.parse(req.url).pathname
    let ReqUrl = `https://www.resup.ir${ResturantName}?qr-id=${QrId}`
    
    https.get(ReqUrl, (response) => {
        let body = '';

        // accumulate the response body
        response.on('data', (chunk) => {
            body += chunk;
        });

        // send the response body when the response is complete
        response.on('end', () => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'text/html');
            res.end(body);
        });
    });
});

// start listening for incoming requests
server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});
