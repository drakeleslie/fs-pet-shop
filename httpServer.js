import http from "http";
import fs from "fs";

var port = process.env.PORT || 8000;

const server = http.createServer((req, res) => {
  const url = new URL("http://localhost:8000" + req.url);
  console.log(url);
  let index = Number(url.pathname.substring(6));

  if (req.method === "GET" && req.url === "/pets") {
    fs.readFile("./pets.json", "utf8", function (err, data) {
      if (err) {
        console.err(err.stack);
        res.statusCode = 500;
        res.setHeader("Content-Type", "text/plain");
        res.end("Internal Server Error");
      }
      res.setHeader("Content-Type", "application/json");
      res.end(data);
    });
  } else if (req.method === "GET" && req.url === `/pets/${index}`) {
    fs.readFile("./pets.json", "utf8", function (err, data) {
      let result = JSON.parse(data);
      if (err) {
        console.err(err.stack);
        res.statusCode = 500;
        res.setHeader("Content-Type", "text/plain");
        res.end("Internal Server Error");
      } else if (!result[index]) {
        res.statusCode = 404;
        res.setHeader("Content-Type", "text/plain");
        res.end("Not Found");
      }
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify(result[index]));
    });
  } //else if (req.method === "POST" && req.url === '/pets')
});
server.listen(port, () => {
  console.log("listening on port", port);
});

//module.exports = server;
