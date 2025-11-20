const http = require("http");
const fs = require("fs");
const path = require("path");

const port = process.env.PORT || 8080;
const root = __dirname;

const mime = {
  ".html": "text/html",
  ".css": "text/css",
  ".js": "application/javascript",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon"
};

http.createServer((req, res) => {
  let filePath = req.url === "/" ? "/index.html" : req.url;
  filePath = path.join(root, decodeURIComponent(filePath));

  // block weird path traversal
  if (!filePath.startsWith(root)) {
    res.writeHead(403);
    return res.end("Forbidden");
  }

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404, {"Content-Type": "text/plain"});
      return res.end("Not found");
    }
    const ext = path.extname(filePath).toLowerCase();
    res.writeHead(200, {"Content-Type": mime[ext] || "application/octet-stream"});
    res.end(data);
  });
}).listen(port, () => console.log(`Server running on ${port}`));
