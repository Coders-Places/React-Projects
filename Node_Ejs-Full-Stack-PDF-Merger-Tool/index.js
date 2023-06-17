const cors = require("cors");
const express = require("express");
const app = express();
const port = 3000;
const blogs = require("./routers/blogs");
const multer = require("multer");
const PDFMerger = require("pdf-merger-js"); // * Another Tool
const path = require("path");
const merge = require("easy-pdf-merge");
const { getSystemErrorMap } = require("util");

// * Defining Destination of the files
const upload = multer({ dest: "uploads/" });

app.use(cors());

// * serving Static/Public Files
app.use("/public", express.static(path.join(__dirname, "/static")));

// * Set the view engine to ejs
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  return res.render(path.join("index"), { message: "Jao dafa ho" });
});
// * Using The Pre-Defined-Router
// app.use("/blogs", blogs); // * Blogs Router

// * Method Must Be 'POST' and Action Must Be "/mergepdfs" (same);
// * And Also the name of [input:file-tag] must be same as "pdfs";
app.post("/MergedPdf", upload.array("items", 2), function (req, res, next) {
  // req.files is array of `photos` files
  // req.body will contain the text fields, if there were any
  console.log(req.files);
  if (req.files.length == 0) {
    return res.send("No Files Found");
  }

  // * Give The Path Of Two Different Files And Get The "merged.pdf"
  merge(
    [
      path.join(__dirname, req.files[0].path),
      path.join(__dirname, req.files[1].path),
    ],
    path.join(__dirname, "static/merged.pdf"),
    function (err) {
      if (err) {
        return console.log(err);
      }
      console.log("Successfully merged!");
      return res.sendFile(path.join(__dirname, "static/merged.pdf"));
    }
  );
});

// * Server Is started On port 3000 and listening the client's Request
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
