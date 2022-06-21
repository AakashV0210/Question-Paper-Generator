var contentDisposition = require("content-disposition");
var destroy = require("destroy");
var fs = require("fs");
var http = require("http");
var onFinished = require("on-finished");

var filePath = "/client/public/assets/uploads/question_paper1.csv";
// C:\Users\Namith\Desktop\Question-Paper-Generator\server\assets\question_paper.csv

http.createServer(function onRequest(req, res) {
  // set headers
  res.setHeader("Content-Type", "question_paper/csv");
  res.setHeader("Content-Disposition", contentDisposition(filePath));

  // send file
  var stream = fs.createReadStream(filePath);
  stream.pipe(res);
  onFinished(res, function () {
    destroy(stream);
  });
});
