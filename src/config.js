const isProduction = (process.env.NODE_ENV === 'production')

module.exports = {
  port: isProduction ? process.env.PORT : 3001,
  database: isProduction ? 'test' : 'mongodb://localhost/chingography',
  origin: isProduction ? 'test' : 'http://localhost:3000'
}
