const { NODE_ENV } = process.env
const pjson = require('../../package.json')
const descriptor = require('./helpers/descriptor')

const CONSTANTS = {
  isDev: NODE_ENV === "development",
  defaultPort: 5001,
  majorVersion: 'v' + pjson.version.charAt(0),
  roles: {
    volunteer: 'volunteer',
    nonProfit: 'non-profit', 
    commercial: 'commercial', 
    moderator: 'moderator', 
    admin: 'admin'
  },
  foldersMap: {
    avatar: 'avatars',
    taskImg: 'taskImgs'
  }
}

module.exports = descriptor(CONSTANTS)
