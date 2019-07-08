const express = require("express");
const fileupload = require("express-fileupload");
const cors = require("cors");
const app = express();

const port = 1337;

app.use(
  cors({
    origin: (origin, callback) => callback(null, true),
    credentials: true
  })
);
app.use(fileupload());

app.use(express.static("public"));

app.post("/api/upload", function(req, res) {
  if (!req.files) {
    return res.status(400).send({ msg: "No files were uploaded." });
  }

  return res.send({
    files: req.files
  });
});

app.listen(port, () => console.log(`Mock server listening on port ${port}!`));
