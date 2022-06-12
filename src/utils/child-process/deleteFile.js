const fs = require('fs')
const path = require('path')

const deleteFile = (filename, dir) => {
  fs.unlink(path.join(process.env.PWD, `/public/uploads/${dir}`, filename), (err) => {
    return err
  })
}

process.on('message', (message) => {
  if (message == 'DELETE') {
    const res = deleteFile(process.argv[2], process.argv[3]) || `Файл ${process.argv[2]} успешно удален`
    process.send(res)
  }
});
