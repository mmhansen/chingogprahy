const controller = {}

controller.home = (req, res, next) => {
  res
    .status(200)
    .json({
      body: 'Welcome home.'
    })
}

controller.notFound = (req, res, next) => {
  res
    .status(404)
    .json({
      body: 'Not found.'
    })
}

module.exports = controller
