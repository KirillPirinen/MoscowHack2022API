
const descriptors = {
  enumerable: true,
  writable: false
}

module.exports = (obj) => {
  const _raw = Object.keys(obj).reduce((acc, key) => {
  return acc[key] = { ...descriptors, value: typeof obj[key] === 'object' ? Object.freeze({...obj[key]}) : obj[key]}, acc
}, {})

  return Object.defineProperties(Object.create(null), _raw)
}
