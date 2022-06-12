const path = require('path')
const multer = require('multer')
const { foldersMap } = require('../utils/constants')

const storage = multer.diskStorage({
  destination(req, file, cb) {
    const folderName = foldersMap[file.fieldname]
    
    cb(null, `./public/uploads/${folderName}`)
  },
  filename(req, file, cb) {
    const ext = path.extname(file.originalname).toLowerCase();
    cb(null, `${req.user.id}_${Date.now() + ext}`)
  }
})

const fileFilter = (req, file, cb) => {
  if(file.mimetype === 'image/png' || 'image/jpeg' || 'image/jpg') {
    cb(null, true)
  } else {
    cb(null, false)
  }
}

module.exports = multer({ storage, fileFilter })
