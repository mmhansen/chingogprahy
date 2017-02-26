const kant = {}
const intro = require('../../models/introModel')
const db = require('debug')('db')

kant.get = (req, res, next) => {
  // skip
  intro
    .find({})
    .select({ comments: 0 })
    .skip(Number(req.query.skip))
    .limit(10)
    .sort({'createdAt': -1})
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

kant.getOne = (req, res, next) => {
  intro
    .findById(req.params.introId)
    .exec()
    .then((intro) => {
      res
        .status(200)
        .json({
          intro: intro
        })
    })
    .catch(next)
}

kant.addComment = (req, res, next) => {
  // req.params.introId <- intro ID
  // req.body <- comment
  intro
    .findByIdAndUpdate(
      req.params.introId,
      {
        $push: {
          'comments': req.body
        }
      },
      { new: true }
    )
    .exec()
    .then(intro => {
      res
        .status(200)
        .json({
          intro: intro
        })
    })
    .catch(next)
}

kant.updateComment = (req, res, next) => {
  intro
    .update({
      _id:            req.params.introId,
      'comments._id': req.params.commentId
    }, {
      $set: {
        'comments.$': req.body
      }
    })
    .exec()
    .then(intro => {
      res
        .status(200)
        .json({
          body: 'Comment updated.',
          intro: intro
        })
    })
    .catch(next)
}

kant.deleteComment = (req,res,next) => {
  intro
    .update({
      _id: req.params.introId
    }, {
      $pull: {
        comments: {
          _id: req.params.commentId
        }
      }
    })
    .then(intro => {
      res
        .status(200)
        .json({
          body: "Comment deleted.",
          intro: intro
        })
    })
    .catch(next)
}

kant.count = (req, res, next) => {
  intro
    .find()
    .count()
    .exec()
    .then(count => {
      res
        .status(200)
        .json({
          count: count
        })
    })
    .catch(next)
}

kant.like = (req, res, next) => {
  const { userId, haveLiked } = req.body
  const method = haveLiked ? '$pull' : '$addToSet'
  intro
    .findByIdAndUpdate(
      req.params.introId,
      {
        [method]: {
          likes: userId
        }
      },
      { new: true }
    )
    .exec()
    .then(intro => {
      res
        .status(200)
        .json({
          intro
        })
    })
    .catch(next)
}

module.exports = kant
