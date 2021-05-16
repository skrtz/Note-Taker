const express = require('express');
const fs = require('fs');
const app = express();

app.use(express.static('public'));

var PORT = process.env.PORT || 3000;

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

require("./api-routes")(app);
require("./html-routes")(app);

app.listen(PORT, function() {
  console.log("App listening on PORT: " + PORT);
});