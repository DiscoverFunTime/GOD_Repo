// Update with your config settings.

module.exports = {

  development: {
    client: 'pg',
    connection: {
      database: 'boken_app'
    },
      debug: true
  },

  // Adding testing environment
  test:{
    client: 'pg',
    connection: {
      database: 'boken_app_test'
    },
    pool: {
      min: 1,
      max: 5
    },
      debug:true
  },

  production: {
    client: 'postgresql',
    connection: process.env.DATABASE_URL,
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

};
