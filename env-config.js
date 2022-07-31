const prod = process.env.NODE_ENV == 'production';

module.exports = {
  'process.env.BACKEND_URL': prod ? '/web-sso' : '',
  '_PORT': prod ? parseInt(process.env.PORT, 10) : 3000,
  '_HOST': prod ? 'https://sso-defispace.ru/' : 'http://localhost'
}