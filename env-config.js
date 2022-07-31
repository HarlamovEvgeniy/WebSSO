const prod = process.env.NODE_ENV == 'production';

module.exports = {
  'process.env.BACKEND_URL': prod ? '/web-sso' : '',
  '_PORT': prod ? 443 : 3000,
  '_HOST': prod ? 'https://sso-defispace.ru/' : 'http://localhost'
}