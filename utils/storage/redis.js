const redis = require('redis');
const client = redis.createClient({ legacyMode: true });
async function initConnect () {
  await client.connect();
}
const { generateString } = require('../index')
var adminKey = "3aa455517f6c40d55c915aa37a69ad395bc21bb89ff04d81480cd54359c2cbb96639c087e21d73c99f42675981d8de3eceebdbed8fdffaa04b4c8eeadacfac1665714b8741a2da99001e3462764a7c7b1a09cfeb16273f5a55c3b02c60ce60d1fc0202e6e01740ef5d9d37de0f873db425ccee8e9cb8d06cc3900a32ed92e147"

module.exports = {
  client,
  initConnect,
  adminKey
}