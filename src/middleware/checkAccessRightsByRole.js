const ApiError = require("../errors/apiError")
const errorMsg = require("../errors/errorMsg")

module.exports = (arrOfPossibleRoles) => (req, res, next) => {

    if(arrOfPossibleRoles.includes(req.user.role)) {
      return next() 
    }

    return next(new ApiError(403, errorMsg.access.denied))
    
}
