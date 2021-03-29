const wml = require('../dist/index.js')
const client = new wml.client()

client.getAiringAnimes().then((data) => console.table(data))
client.getAiringAnimes(10000).then((data) => console.table(data))