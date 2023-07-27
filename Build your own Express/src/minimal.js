const http = require("http");

const fs = require("fs");
const path = require("path");

function Minimal() {
  function listen(port = 8080, cb) {
    return http
      .createServer((req, res) => {
        fs.readFile(
          path.resolve(__dirname, "public", "index.html"),
          (err, data) => {
            res.setHeader("Content-Type", "text/html");
            if (err) {
              res.writeHead(500);
              return res.end("Some error occured");
            }
            res.writeHead(200);
            return res.end(data);
          }
        );
      })
      .listen({ port }, () => {
        if (cb) {
          if (typeof cb === "function") {
            return cb();
          }
          throw new Error("Listen callback needs to be a function");
        }
      });
  }
}

module.exports = Minimal;