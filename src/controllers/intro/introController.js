const kant = {}
const intro = require('../../models/introModel')

kant.get = (req, res, next) => {
  // skip
  intro
    .find({})
    .sort('created_at')
    .skip(req.query.skip)
    .limit(10)
    .exec()
    .then(function (intros) {
      res.json({intros: intros})
    })
    .catch(next)
}

kant.post = (req, res, next) => {
  const newIntro = new intro(req.body)

  newIntro
    .save()
    .then(function (doc) {
      res.json({
        body: 'created intro',
        intro: doc
      })
    })
    .catch(next)
}

kant.put = (req, res, next) => {
  intro
    .findByIdAndUpdate(
      req.params.introId,
      req.body,
      { new: true }
    )
    .exec()
    .then(intro => {
      res
        .status(200)
        .json({
          body: 'Updated intro.',
          intro: intro
        })
    })
    .catch(next)
}

kant.delete = (req, res, next) => {
  intro
    .findByIdAndRemove(req.params.introId)
    .exec()
    .then(intro => {
      res
        .json({
          body: 'Deleted intro.'
        })
    })
    .catch(next)
}

module.exports = kant
