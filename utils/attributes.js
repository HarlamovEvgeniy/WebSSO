const fs = require('fs')
const customError = require('./customError')
const schemaContext = require('../public/contexts/schemaContext.json')

module.exports = {

    requireAttribute: (attribute) => {
        if(typeof attribute === "string") {
            if(schemaContext["@context"]?.[attribute]) return true
            else throw new customError.NotFoundError(`The "${attribute}" attribute was not found`)
        } else {
            throw new TypeError(`Got ${typeof attribute} instead of string`)
        }
    }

}