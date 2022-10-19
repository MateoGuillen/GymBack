require('dotenv').config()
const jwt = require("jsonwebtoken");
exports.verify = (req, res) => {
    var token = req.headers.authorization.split(" ")[1];
    console.log(token)
    var data = {
      login : false
    }
    if (token){
      try {
        var decoded = jwt.verify(token, process.env.PRIVATE_KEY);
        console.log(decoded)
        console.log(decoded.username + " esta logueado actualmente")
        data = {
            login : true,
            username : decoded.username
          }
        res.send(data)
      } catch(err) {
        // err
        //console.log("JWT no valido")
        console.log(err)
        console.log("bloque catch")
        res.send(data);
        
      }
    }else{
      //console.log("IR AL LOGIN")
      console.log("bloque else")
      res.send(data);
    }
  };