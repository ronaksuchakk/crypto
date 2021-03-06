var crypto = require("crypto");
var jwt = require("jsonwebtoken");
var env = require("../config/index.js");

var verifyPassword = function (password, hash, salt) {
  return (
    hash ===
    crypto.pbkdf2Sync(password, salt, 10000, 512, "sha512").toString("hex")
  );
};

var generateJWT = function (id, username) {
  var today = new Date();
  var exp = new Date(today);
  exp.setDate(today.getDate() + 10);

  return jwt.sign(
    {
      id: id,
      username: username,
      exp: parseInt(exp.getTime() / 1000),
    },
    env.secret
  );
};

var AuthJSON = function (id, username, email, role, favorites) {
  return {
    id: id,
    username: username,
    email: email,
    role: role,
    favorites: favorites,
    token: generateJWT(id, username),
  };
};

module.exports = { verifyPassword, generateJWT, AuthJSON };
