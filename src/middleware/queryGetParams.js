const _ = require('lodash')
const models = require('../../db/models')

const defaultResolvers = [
  (searchParams) => {
    if(searchParams.hasOwnProperty('order') || searchParams.hasOwnProperty('orderBy')) {
      let order = [[searchParams.orderBy || 'createdAt', searchParams.order || 'DESC']]
      searchParams.order = order
      delete searchParams.orderBy
    }
  }
]

const orderBySanitazer = (val, model) => {
  const modelFields = models[model]?.rawAttributes || {}
  return modelFields.hasOwnProperty(val) ? val : 'createdAt'
}

const queryGetParamsMiddleware = (options = {}) => {
  const { model, sanitazers = {}, resolvers = [] } = options

  const sanitazer = {
    order: (val) => val?.toLowerCase() === 'asc' ? 'ASC' : 'DESC',
    orderBy: (val) => orderBySanitazer(val, model),
    offset: (val) => parseInt(val),
    limit: (val) => parseInt(val),
    ...sanitazers
  }

  const resolver = [
    ...resolvers,
    ...defaultResolvers
  ]

  return (req, res, next) => {
    let _searchParams

    if(!_.isEmpty(req?.query)) {
      _searchParams = Object.keys(req.query).reduce((query, key) => {
        if(sanitazer.hasOwnProperty(key)) {
          const res = sanitazer[key](req.query[key])
          if(!(Object.is(res, NaN) || Object.is(res, null) || Object.is(res, undefined))) {
            query[key] = res
          }
        }
        return query
      }, {})

      resolver.forEach(cb => cb(_searchParams))

      req.searchParams = _searchParams
    }

    req.searchParams = _searchParams || {}

    next()
  }
}

module.exports = queryGetParamsMiddleware
