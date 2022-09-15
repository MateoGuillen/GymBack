const express = require("express");
const cors = require("cors");
var { expressjwt: jwt } = require("express-jwt");
require('dotenv').config()
const app = express();

var corsOptions = {
  origin: ["http://localhost:3000", "https://standfordgym.vercel.app"]
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

console.log(process.env.PRIVATE_KEY)


app.use(
  jwt({
    secret: process.env.PRIVATE_KEY,
    algorithms: ["HS256"],
  }).unless({ path: ["/api/users/login", "/api/users/signup"] })
);

/*
app.use(
  jwt({ secret: process.env.PRIVATE_KEY, algorithms: ["HS256"] })
  .unless({ path: [] }),
    function (req, res) {
      if (!req.auth.admin) return res.sendStatus(401);
      res.sendStatus(200);
    }
);
*/

/*app.get(
  "/ruta_aca",
  jwt({ secret:process.env.PRIVATE_KEY, algorithms: ["HS256"] }),
  function (req, res) {
    if (!req.auth.admin) return res.sendStatus(401);
    res.sendStatus(200);
  }
);*/

const db = require("./app/models");
db.sequelize.sync()
  .then(() => {
    console.log("Synced db.");
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
  });



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
