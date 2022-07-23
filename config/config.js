module.exports = {
  development: {
    username: 'postgres',
    password: '12345678',
    database: 'kkal',
    host: '127.0.0.1',
    dialect: 'postgres',
    // username: 'root',
    // password: 'password',
    // database: 'time_db',
    // host: 'mysql',
    // dialect: 'mysql',
  },
  test: {
    username: 'postgres',
    password: '12345678',
    database: 'kkal',
    host: '127.0.0.1',
    dialect: 'postgres',
  },
  production: {
    username: 'root',
    password: null,
    database: 'database_production',
    host: '127.0.0.1',
    dialect: 'mysql',
  },
};
