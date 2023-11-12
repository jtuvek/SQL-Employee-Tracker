const mysql = require('mysql2');
const util = require('util');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Cawy6248$',
  database: 'employee_tracker_db',
});

const query = util.promisify(connection.query).bind(connection);

module.exports = {
  connect: () => {
    return new Promise((resolve, reject) => {
      connection.connect((err) => {
        if (err) {
          reject(err);
        } else {
          console.log('Connected to MySQL database');
          resolve();
        }
      });
    });
  },
  closeConnection: () => {
    connection.end();
    console.log('Connection closed');
  },
  query,
};
