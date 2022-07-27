const redis = require('redis');
const client = redis.createClient({ legacyMode: true });
async function initConnect () {
  await client.connect();
}

module.exports = {
  client,
  initConnect
}