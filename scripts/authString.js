'use strict';
const base64 = require('base-64');
function createBasicAuthString(username, password) {
  const mockUser = {
    username: 'ben',
    password: 'password'
  };
  return base64.encode(`Basic ${username}:${password}`);
}
console.log(createBasicAuthString('ben','password'));

module.exports={createBasicAuthString}
