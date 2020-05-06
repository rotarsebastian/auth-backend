// const { database, username, password } = require('./config/dbConfig');
const { knexSnakeCaseMappers } = require('objection');

module.exports = {

  development: {
    client: 'mysql',
    connection: {
      host: process.env.DB_HOST || '',
      user: process.env.DB_USER || username,
      password: process.env.DB_USER_PASS || password,
      database: process.env.DB || database,
    }
  },

  ...knexSnakeCaseMappers()
  
};
