/*************************************************************

You should implement your request handler function in this file.

requestHandler is already getting passed to http.createServer()
in basic-server.js, but it won't work as is.

You'll have to figure out a way to export this function from
this file and include it in basic-server.js so that it actually works.

*Hint* Check out the node module documentation at http://nodejs.org/api/modules.html.

**************************************************************/
var exports = module.exports = {};
let results = [
  {username: "Test", message: "Test"}
];
var requestHandler = function(request, response) {

  var defaultCorsHeaders = {
    'access-control-allow-origin': '*',
    'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'access-control-allow-headers': 'content-type, accept',
    'access-control-max-age': 10 // Seconds.
  };

  var headers = defaultCorsHeaders;


  console.log('Serving request type ' + request.method + ' for url ' + request.url);
  //================================================================================


  if (request.method === 'OPTIONS') {
    response.writeHead(203, headers);
    response.end(JSON.stringify(headers));
  } else if (request.method === 'GET' && request.url === '/classes/messages') {
    response.writeHead(200, headers);
    response.end(JSON.stringify({results}));
  } else if (request.method === 'POST' && request.url === '/classes/messages') {
    request.on('data', (chunk) => {
      var message = JSON.parse(chunk.toString());
      message.objectId = new Date();
      results.unshift(message);
    });
    request.on('end', () => {
      response.writeHead(201, headers);
      response.end(JSON.stringify(results));
    });
  } else {
    response.writeHead(404, headers);
    response.end('SOMEONE SHOULD FEEL BAD ABOUT THIS!');
  }


};

module.exports.requestHandler = requestHandler;
