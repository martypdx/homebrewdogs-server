
require('dotenv').config();
const client = require('../lib/db-client');
const bcrypt = require('bcryptjs');

client.query(`
  INSERT INTO profile (username, hash)
  VALUES ($1, $2)
  RETURNING id;
`,
['user123', bcrypt.hashSync('abc123', 8)]
)
  .then(
    () => console.log('seed data load complete'),
    err => console.log(err)
  )
  .then(() => {
    client.end();
  });