const prod = process.env.NODE_ENV === 'production';

module.exports = {
  'process.env.BACKEND_URL': prod ? '/web-sso' : '',
  '_PORT': 3000,
  '_HOST': '127.0.0.1'
}