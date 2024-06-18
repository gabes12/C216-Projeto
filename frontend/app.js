const http = require("http");
const fs = require("fs");
const path = require("path");

const PORT = 3000;
const PUBLIC_DIR = "./public";

const mimeTypes = {
  ".html": "text/html",
  ".js": "application/javascript",
  ".css": "text/css",
};

http
  .createServer((request, response) => {
    let filePath =
      request.url === "/"
        ? `${PUBLIC_DIR}/index.html`
        : `${PUBLIC_DIR}${request.url}`;
    const extname = path.extname(filePath).toLowerCase();
    const contentType = mimeTypes[extname] || "application/octet-stream";

    fs.readFile(filePath, (error, content) => {
      if (error) return console.log(error);
      response.writeHead(200, { "Content-Type": contentType });
      response.end(content, "utf-8");
    });
  })
  .listen(PORT, () => {
    console.log(`Frontend rodando em http://localhost:${PORT}/`);
  });
