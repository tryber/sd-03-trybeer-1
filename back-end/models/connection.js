const mysqlx = require('@mysql/xdevapi');

require('dotenv/config');

let schema;
module.exports = () =>
  schema
    ? Promise.resolve(schema)
    : mysqlx.createConnection({
        host: process.env.HOSTNAME,
        user: process.env.MYSQL_USER,
        password: process.env.MYSQL_PASSWORD,
        port: 33060,
        socketPath: '/var/run/mysqld/mysqld.sock',
      });
