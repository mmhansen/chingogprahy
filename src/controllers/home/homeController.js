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

controller.getUser = (req, res, next) => {
  if (req.user) {
    res
      .status(200)
      .json({
        user: req.user._doc
      })
  } else {
    res
      .status(401)
      .json({
        body: 'Unauthorized. :\'('
      })
  }
}

module.exports = controller
