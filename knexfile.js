const { database, username, password } = require('./config/dbConfig');
const { knexSnakeCaseMappers } = require('objection');

module.exports = {

  development: {
    client: 'mysql',
    connection: {
      database: process.env.DB || database,
      user: process.env.DB_USER || username,
      password: process.env.DB_USER_PASS || password,
    }
  },

  ...knexSnakeCaseMappers()
  
};
