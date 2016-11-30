const express = require('express');
const router = express.Router();

const slug = require('slug');
const validator = require('validator');

const jwt = require('jsonwebtoken');

const userModel = require('../model/users');

router.get('/user', (req, res, next) => {
  let rawToken = req.headers.authorization;
  let theToken = rawToken.split(' ')[1];
  let decoded = jwt.verify(theToken, process.env.SECRET);
  if (decoded) {
    res.json(decoded);
  }
  res.json({});
});

router.post('/login', (req, res, next) => {
  console.log('Request: ', req.body.user);
  let  user = req.body.user;
  if (!user) res.status(500).send({error: {"Invalid": "no user set"}});

  let email = user.email;
  let password = user.password;

  if (!email || !password) {
    res.status(500).send({error: {"Blank": "email or password"}});
    return;
  }

  userModel.getUserByEmail(email)
    .then((user) => {
      console.log('user: ', Object.keys(user).length);
      if (Object.keys(user).length) {
        let theUser = user;
        console.log('password: ', password, 'hash: ', theUser.password_digest);
        let passwordCheck = userModel.checkPassword(password, theUser.password_digest);
        console.log(passwordCheck);
        if (passwordCheck) {
          return theUser;
        } else {
          res.status(500).send({error: {"Password": "and Email combination do not match"}});
          return;
        }
      } else {
        res.status(500).send({error: {"Email": "is not registered"}});
        return;
      }
    })
    .then((theUser) => {
      if (theUser) {
        let today = new Date();
        let exp = new Date(today);
        exp.setDate(today.getDate() + 60);

        let token = jwt.sign({
          theUser: theUser,
          exp: parseInt(exp.getTime() / 1000)
        }, process.env.SECRET);

        if (token) {
          theUser.token = token;
          res.json({user: theUser});
        } else {
          res.status(500).send({error: {"Ooops": "something went wrong"}});
        }
      } else {
        res.status(500).send({error: {"Password": "and Email combination not correct"}});
      }
    })
});

router.post('/register', (req, res, next) => {
  let user = req.body.user;
  if (!user) res.status(500).send({error: {"Invalid": "no user set"}});

  let username = user.username;
  let email = user.email;
  let password = user.password;

  if (!username || !email || !password) {
    res.status(500).send({error: {"Blank": "username, email, or password"}});
    return;
  }

  if (username.length < 5 || username.length > 30) {
    res.status(500).send({error: {"Username": "is not valid"}});
    return;
  }

  let userSlug = slug(username);

  if (!validator.isEmail(email)) {
    res.status(500).send({error: {"Email": "is not valid"}});
    return;
  }

  var checks = {};
  //CHECK USERNAME
  userModel.checkSlug(userSlug)
    .then((doesExist) => {
      if (doesExist.length > 0) {
        checks.Username = "already exists";
      }
      return;
    })
    .then(() => {
      return userModel.checkEmail(email);
    })
    .then((doesExist) => {
      if (doesExist.length > 0) {
        checks.Email = "has been registered";
      }
      return;
    })
    .then(() => {
      if (Object.keys(checks).length > 0) {
        res.status(500).send({error: checks});
        return;
      } else {
        userModel.insertUser(username, userSlug, email, password)
          .then((response) => {
            return response[0]
          })
          .then((newUserID) => {
            userModel.getUserById(newUserID).then((user) => {
              let theUser = user[0];
              let today = new Date();
              let exp = new Date(today);
              exp.setDate(today.getDate() + 60);

              let token = jwt.sign({
                user: theUser,
                exp: parseInt(exp.getTime() / 1000)
              }, process.env.SECRET);

              if (token) {
                theUser.token = token;
                res.json({user: theUser});
              } else {
                res.status(500).send({error: {"Ooops": "something went wrong"}});
              }
            });
          })
          .catch(error => res.status(500).send({error: {"Internal": "server error"}}));
      }
    });
});

module.exports = router;
