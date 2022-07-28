const fs = require('fs')


function get() {
    return JSON.parse(fs.readFileSync('../../logs.json'))
}

function set(key, data) {
    var data = JSON.parse(fs.readFileSync('../../logs.json'))
    data[key].push(JSON.stringify(data, null, 2))
}

module.exports = {
    get, set
}