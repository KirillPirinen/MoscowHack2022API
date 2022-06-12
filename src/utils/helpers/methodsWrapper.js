const safeMiddleware = require("./safeMiddleware")

module.exports = (obj, wrapper = safeMiddleware) => {
  Object.keys(obj).forEach(key => {
    if(typeof obj[key] === 'function') obj[key] = wrapper(obj[key])
  })
  return obj
}
