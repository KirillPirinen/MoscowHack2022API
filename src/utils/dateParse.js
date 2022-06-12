const moment = require('moment')

module.exports = (time) => {
  if(!time) return null

  const dbDate = moment(time)

  if(dbDate.isBefore(Date.now(), 'd')) {
    return dbDate.format('LL')
  }

  return dbDate.startOf('m').fromNow()
}
