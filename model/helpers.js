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
  }
}

module.exports = helpers;
