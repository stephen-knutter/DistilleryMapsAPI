const jwt = require('jsonwebtoken');

let helpers = {
  getUserIdFromToken: token => {
    let theToken = token.split(' ')[1];
    let decoded = jwt.verify(theToken, process.env.SECRET);
    let userID = decoded.user.id;
    if (!userID) {
      return false;
    }
    return userID;
  },

  getDecodedTokenFromToken: token => {
    let theToken = token.split(' ')[1];
    let decoded = jwt.verify(theToken, process.env.SECRET);

    return decoded ? decoded : false;
  },

  signNewToken: (user) => {
    let today = new Date();
    let exp = new Date(today);

    exp.setDate(today.getDate() + 60);

    let token = jwt.sign({
      user: user,
      exp: parseInt(exp.getTime() / 1000)
    }, process.env.SECRET);

    return token ? token : false;
  }
}

module.exports = helpers;
