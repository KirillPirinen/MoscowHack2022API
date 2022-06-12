const { api } = require("../../.serverrc")

const ownStaticPrefixes = {
  avatar: api.url + `/uploads/avatars/`
}

module.exports = (stringPath, type) => {

  if(!stringPath) return void undefined

  return stringPath.startsWith('http') ? stringPath : ownStaticPrefixes[type] + stringPath
  
}
