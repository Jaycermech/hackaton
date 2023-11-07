var express = require("express");
var bodyParser = require("body-parser");
var app = express();
const PORT = process.env.PORT || 6060;
var startPage = "home.html";
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static("./public"));

const { viewResources, addResource } = require("./utils/ResourceUtil");
app.get("/view-resources", viewResources);
app.post("/add-resource", addResource);

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/" + startPage);
});

const server = app.listen(PORT, function () {
  console.log(`Demo project at: http://localhost:${PORT}`);
});

module.exports = { app, server };
