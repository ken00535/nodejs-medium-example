const http = require("http");
const url = require("url");
const path = require("path");
const fs = require("fs");

// setting user-defined type
const mimeTypes = {
  html: "text/html",
  jpeg: "image/jpeg",
  jpg: "image/jpg",
  png: "image/png",
  js: "text/javascript",
  css: "text/css",
  mp4: "video/mp4",
  woff: "text/woff",
};

//create http server
var server = http.createServer(function (req, res) {
  var uri = url.parse(req.url).pathname;
  var fileName = path.join(process.cwd(), unescape(uri));
  console.log("Loading " + uri);
  var stats;

  //check if the file is enter
  try {
    stats = fs.lstatSync(fileName);
  } catch (e) {
    res.writeHead(404, { "Content-type": "text/plain" });
    res.write("404 Not Found!\n");
    res.end();
    return;
  }

  //get the file type to check is html type
  if (stats.isFile()) {
    var mineType = mimeTypes[path.extname(fileName).split(".").reverse()[0]];
    res.writeHead(200, { "Content-type": mineType });
    var fileStream = fs.createReadStream(fileName);
    fileStream.pipe(res);
  } else {
    res.writeHead(500, { "Content-type": "text/plain" });
    res.write("500 Internal Error\n");
    res.end();
  }
});
server.listen(8888);
