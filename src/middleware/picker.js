const _ = require('lodash')

module.exports = (allowedFields) => (req, res, next) => {
  req.body = _.pick(req.body, allowedFields)
  next()
}
