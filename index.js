const express = require('express');
const cookieSession = require("cookie-session");
const bodyParser = require("body-parser");
const rateLimit = require("express-rate-limit");
const cors = require("cors");
const app = express();
const colorette = require("colorette")
const makeToken = require("./src/generator/token")
/* App Intilization */
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cookieSession({
    name: "By Cheeini",
    keys: ["follow", "Nicat-dcw"],
    maxAge: 120 * 60 * 60 * 1000,
  })
);
/*end*/

/* Connect To MongoDB */
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URL)
  .then(() => console.log(`${colorette.green("CONNECTED TO MONGODB")}`));

app.use("/api", require("./src/routers/api.js"));
app.use("/admin",require("./src/routers/admin.js"))
app.get('/', (req, res) => {
  res.send('Hello Express app!')
});

app.listen(3000, () => {
  console.log('server started');
});
