const { fork } = require('child_process')

module.exports = (payloadArr, script, cmd) => {
  const child = fork(process.env.PWD + `/src/utils/child-process/${script}`, payloadArr);

  child.on('message', (message) => {
    console.log(message);
  })
  
  child.send(cmd)
}
