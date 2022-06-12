const { isDev } = require("./constants");
const fs = require('fs')
const morgan = require('morgan')

module.exports = () => {
  if(!isDev) {

    const accessLogStream = fs.createWriteStream(
      process.env.PWD + '/logs/' + "server.log", { flags: 'a' }
    );

    return morgan('combined', { stream: accessLogStream });
  }
  else {
    return morgan("dev");
  }
}
