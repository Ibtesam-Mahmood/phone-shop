
//Imports
const express = require('express');

//Init app
const app = express();



//The the application
const port = 8080
app.listen(port, () => {
  console.log("Server running on port " + port);
});