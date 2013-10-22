var http = require("http"); 
var url = require("url");

function start(route, handle) {
  function onRequest(request, response) {

    var postData = "";
    var pathname = url.parse(request.url).pathname;
    console.log("Request for " + pathname + " received.");

    request.setEncoding("utf8");

    // Called when a new chunk of data was recieved
    request.addListener("data", function(postDataChunk) {
      postData += postDataChunk;
      console.log("Received POST data chunk '" + postDataChunk + "'.");
    });

    // Called when all chunks of data have been received
    request.addListener("end", function(){
      console.log("Complete!");
      route(handle, pathname, response, postData);
    });


    
  }//eo function onRequest
  
  http.createServer(onRequest).listen(8888);
  console.log("Server has started.");
  
}
exports.start = start;