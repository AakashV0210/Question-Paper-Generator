var http = require("http");
var formidable = require("formidable");
var fs = require("fs");

http.createServer(function (req, res) {
  if (req.url == "/upload") {
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
      var oldpath = files.filetoupload.filepath;
      var newpath = 'C:/Users/Namith/' + files.filetoupload.originalFilename;
      fs.rename(oldpath, newpath, function (err) {
        if (err) throw err;
        res.write("File uploaded and moved!");
        res.end();
      });
    });
  } 
  // else {
  //   res.writeHead(200, { "Content-Type": "csv" });
  //   res.write(
  //     '<form action="/upload" method="post" enctype="multipart/form-data">'
  //   );
  //   res.write('<input type="file" name="myfile"><br>');
  //   res.write('<input type="submit">');
  //   res.write("</form>");
  //   return res.end();
  // }
});
