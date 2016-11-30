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

  getUserById: (userID) => {
    return knex('users').where('id', userID);
  },

  getUserByEmail: (email) => {
    return knex('users').where('email', email).first();
  },

  checkPassword: (password, hash) => {
     return bcrypt.compareSync(password, hash);
  },

  checkSlug: (slug) => {
    return knex('users').where('slug', slug);
  },

  checkEmail: (email) => {
    return knex('users').where('email', email);
  }

}

module.exports = query;
