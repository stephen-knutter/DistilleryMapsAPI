const express = require('express');
const router = express.Router();

const fs = require('fs');

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
});

router.get('/profile/:userslug', (req, res, next) => {
  let userslug = req.params.userslug;
  userModel.getUserBySlug(userslug)
    .then((user) => {
      res.json({UserProfile: user});
    });
});

router.post('/photo', (req, res, next) => {
  let rawToken = req.headers.authorization;
  let theToken = rawToken.split(' ')[1];
  let decoded = jwt.verify(theToken, process.env.SECRET);
  if (decoded) {
    let user = decoded.user;
    let photoFile = req.files.photo;
    let photoName = photoFile.name;
    let mimetype = photoFile.mimetype;

    if (mimetype === 'image/png' ||
        mimetype === 'image/PNG' ||
        mimetype === 'image/jpg' ||
        mimetype === 'image/JPG' ||
        mimetype === 'image/jpeg' ||
        mimetype === 'image/JPEG' ||
        mimetype === 'image/gif' ||
        mimetype === 'image/GIF') {
      let date = Date.now();
      var extension;
      switch(mimetype) {
        case 'image/png':
        case 'image/PNG':
          extension = '.png';
          break;

        case 'image/jpg':
        case 'image/JPG':
          extension = '.jpg';
          break;

        case 'image/jpeg':
        case 'image/JPEG':
          extension = '.jpeg';
          break;

        case 'image/gif':
        case 'image/GIF':
          extension = '.gif';
          break;
      }

      let newFilename = date + '-' + 'distillery-maps' + extension;

      let filePath = __dirname + '/../public/images/users/'+user.id+'/';

      if (!fs.existsSync(filePath)) {
        fs.mkdirSync(filePath);
      }

      let fullFilepath = filePath + newFilename;
      photoFile.mv(fullFilepath, (err) => {
        if (err) {
          res.status(500).send({error: {"Ooops": "something went wrong"}});
        } else {
          userModel.updatePhoto(user.id, newFilename)
            .then((data) => {
              user.profile_pic = newFilename;

              let today = new Date();
              let exp = new Date(today);
              exp.setDate(today.getDate() + 60);
              let token = jwt.sign({
                user: user,
                exp: parseInt(exp.getTime() / 1000)
              }, process.env.SECRET);

              res.json({user: user, token: token});
            })
            .catch((err) => {
              res.status(500).send({error: {"Ooops": "something went wrong"}});
            })
        }
      })
    } else {
      res.status(500).send({error: {"Invalid": "file type, must be jpg, png or gif"}});
    }
  } else {
    res.status(500).send({erro: {"Invalid": "must login to change profile"}});
  }
})

router.post('/login', (req, res, next) => {
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
      if (Object.keys(user).length > 0) {
        let theUser = user;
        let passwordCheck = userModel.checkPassword(password, theUser.password_digest);
        if (passwordCheck) {
          return theUser;
        } else {
          res.status(500).send({error: {"Password": "and Email combination do not match"}});
          res.end();
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
          user: theUser,
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
      if (doesExist) {
        checks.Username = "already exists";
      }
      return;
    })
    .then(() => {
      return userModel.checkEmail(email);
    })
    .then((doesExist) => {
      if (doesExist) {
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

router.put('/update', (req, res, next) => {
  let rawToken = req.headers.authorization;
  let theToken = rawToken.split(' ')[1];
  let decoded = jwt.verify(theToken, process.env.SECRET);

  if (decoded) {
    let user = decoded.user;

    let updates = req.body;
    let username = updates.username;
    let email = updates.email;
    let password = updates.password;

    if (!username || !email) {
      res.status(500).send({error: {"Username": "or email is blank"}});
    } else {
      let checks = {};
      if (username.length < 5 || username.length > 30) {
        checks.Username = "must be between 5 and 30 characters";
      }

      if (!validator.isEmail(email)) {
        checks.Email = "is not valid";
      }

      if (Object.keys(checks).length > 0) {
        res.status(500).send({error: checks});
      } else {
        let userSlug = slug(username);

        if (password) {
          userModel.updateUserWithPassword(user.id, username, userSlug, email, password)
            .then((data) => {
              return data;
            })
            .then((data) => {
              return userModel.getUserById(user.id);
            })
            .then((data) => {
              let user = data[0];
              console.log('slug: ', user);
              let today = new Date();
              let exp = new Date(today);
              exp.setDate(today.getDate() + 60);
              let token = jwt.sign({
                user: user,
                exp: parseInt(exp.getTime() / 1000)
              }, process.env.SECRET);

              res.json({user: user, token: token});

            })
            .catch((err) => {
              res.statsu(500).send({error: {"Ooops": "something went wrong"}});
            })
        } else {
          userModel.updateUserWithoutPassword(user.id, username, userSlug, email)
            .then((data) => {
              return data;
            })
            .then((data) => {
              return userModel.getUserById(user.id);
            })
            .then((data) => {
              let user = data[0];
              let today = new Date();
              let exp = new Date(today);
              exp.setDate(today.getDate() + 60);
              let token = jwt.sign({
                user: user,
                exp: parseInt(exp.getTime() / 1000)
              }, process.env.SECRET);

              res.json({user: user, token: token});
              return;
            })
            .catch((err) => {
              res.status(500).send({error: {"Ooops": "something went wrong"}});
            })
        }
      }
    }
  }
});
module.exports = router;
