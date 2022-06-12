const { api } = require("../../.serverrc")

const ownStaticPrefixes = {
  avatar: api.url + `/uploads/avatars/`,
  taskImage: api.url + `/uploads/taskImgs/`
}

module.exports = (stringPath, type) => {

  if(!stringPath) return void undefined

  return stringPath.startsWith('http') ? stringPath : ownStaticPrefixes[type] + stringPath
  
}
