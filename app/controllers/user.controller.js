const db = require("../models");
const userDB = db.users;
const Op = db.Sequelize.Op;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require('dotenv').config()


function generateAccessToken(username) {
  return jwt.sign({ username }, process.env.PRIVATE_KEY, { expiresIn: "1800s", });
}

// Create and Save a new user
exports.create = async function (req, res)  {
  // Validate request
  if (!req.body.username || !req.body.password) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }
  // generate salt to hash password
  const salt = await bcrypt.genSalt(10);
  var hashedpassword = await bcrypt.hash(req.body.password, salt);
  console.log("pass hashed", hashedpassword)
  // Create a user
  const userPost = {
    username: req.body.username,
    password: hashedpassword,
  };
  console.log(userPost)

  // Save user in the database
  userDB.create(userPost)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the user."
      });
    });
};

exports.login = async function (req, res) {
  // Validate request
    if (!req.body.username || !req.body.password) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    return;
  }
    var condition = { username: req.body.username }
    const user = await userDB.findOne({where :condition });
    console.log(user.username)
    console.log(req.body.username)
    if (user) {
      // check user password with hashed password stored in the database
      const validPassword = await bcrypt.compare(req.body.password, user.password);
      if (validPassword) {
        //res.status(200).json({ message: "Valid password" });
        const token = generateAccessToken(user.username);
        res.json({
          token: `Bearer ${token}`,
        });
      } else {
        res.status(400).json({ error: "Invalid Password" });
      }
    } else {
      res.status(401).json({ error: "User does not exist" });
    }

  }



// Retrieve all users from the database.
exports.findAll = (req, res) => {
  const username = req.query.username;
  var condition = username ? { username: { [Op.iLike]: `%${username}%` } } : null;
  userDB.findAll({ where: condition})
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving users."
      });
    });
};

