const express = require("express");
const cors = require("cors");

const app = express();

var corsOptions = {
  origin: ["http://localhost:3000", "https://standfordgym.vercel.app"]
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

const db = require("./app/models");
db.sequelize.sync()
  .then(() => {
    console.log("Synced db.");
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
  });


require('dotenv').config()
//onsole.log(process.env) // remove this after you've confirmed it working

// // drop the table if it already exists
// db.sequelize.sync({ force: true }).then(() => {
//   console.log("Drop and re-sync db.");
// });

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to StandforGym APP." });
});

require("./app/routes/customer.routes")(app);
require("./app/routes/cuota.routes")(app);
require("./app/routes/user.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

//npm install dotenv --save
