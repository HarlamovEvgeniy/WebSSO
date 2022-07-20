const { randomBytes } = require('crypto');
const SDK = require('everscale-did-sdk-radiance');
const attributes = require('./attributes')

module.exports = {
  generateString: (size) => {
    return randomBytes(size).toString('hex');
  },

  login: (did, value, signature) => {
    return new Promise(async (resolve, reject) => {
      try {
        let document = await SDK.resolveDIDDocument(did);
        let check = await SDK.verifyMessage(
          value,
          signature,
          document.didDocument.verificationMethod.publicKeyMultibase
        );

        resolve(check)
      } catch (e) {
        reject(e)
      }
    })
  },

  requireAttribute: attributes.requireAttribute,
  requireAttributes: attributes.requireAttributes
}