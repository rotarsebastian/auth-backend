const { knexSnakeCaseMappers } = require('objection');

module.exports = {

  production: {
    client: 'mysql',
    connection: process.env.JAWSDB_URL,
    migrations: {
      directory: __dirname + '/migrations'
    },
    seeds: {
      directory: __dirname + '/seeds'
    }
  },

  ...knexSnakeCaseMappers()
  
};
