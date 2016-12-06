const knex = require('./config');
const bcrypt = require('bcrypt');

query = {

  insertUser: (username, slug, email, password) => {

    let hash = bcrypt.hashSync(password, 10);

    return knex('users').insert({
      username: username,
      slug: slug,
      email: email,
      password_digest: hash
    })
    .returning('id')

  },

  updateUserWithPassword(userID, username, userSlug, email, password) {

    let hash = bcrypt.hashSync(password, 10);

    return knex('users').update({
      username: username,
      slug: userSlug,
      email: email,
      password_digest: hash
    })
    .where('id', userID);
  },

  updateUserWithoutPassword(userID, username, userSlug, email) {
    return knex('users').update({
      username: username,
      slug: userSlug,
      email: email
    })
    .where('id', userID);
  },

  getUserById: (userID) => {
    return knex('users').where('id', userID);
  },

  getUserByEmail: (email) => {
    return knex('users').where('email', email);
  },

  getUserBySlug: (userslug) => {
    return knex('users').where('slug', userslug);
  },

  getUserIdBySlug: (userslug) => {
    return knex('users').select('id').where('slug', userslug);
  },

  getUserFavoritesById: (userID) => {
    return knex.raw(
      `SELECT * FROM distilleries
      WHERE distilleries.id IN (SELECT distill_id FROM favorites WHERE user_id=${userID})`
    )
  },

  getUserIdFromSlug: (userSlug) => {
    return knex('users').select('id').where('slug', userSlug);
  },

  checkPassword: (password, hash) => {
     return bcrypt.compareSync(password, hash);
  },

  checkSlug: (slug) => {
    return knex('users').where('slug', slug).first();
  },

  checkEmail: (email) => {
    return knex('users').where('email', email).first();
  },

  updatePhoto: (userID, photoName) => {
    return knex('users').update({profile_pic: photoName}).where('id', userID);
  }

}

module.exports = query;
