const isProduction = (process.env.NODE_ENV === 'production')

module.exports = {
  port: isProduction ? process.env.PORT : 3001,
  database: isProduction ? 'mongodb://admin:12345@ds153729.mlab.com:53729/chingography' : 'mongodb://localhost/chingography',
  origin: isProduction ? 'https://chingography.herokuapp.com' : 'http://localhost:3000',
  secret: 'I like vegetdables'
}
