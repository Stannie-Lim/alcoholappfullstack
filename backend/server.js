const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use("/users", require("./routes/users"));
app.use("/spirits", require("./routes/spirits"));

const PORT = process.env.PORT || 3000;
// 1. the port on which to listen to for requests
// 2. a callback function that will be called when the server is ready
app.listen(PORT, () => {
  console.log(`listening on ${PORT}`);
});
