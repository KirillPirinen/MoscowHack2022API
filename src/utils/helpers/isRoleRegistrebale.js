const { roles } = require("../constants")

registredRoles = [roles.volunteer, roles.nonProfit, roles.commercial]

module.exports = (string) => registredRoles.some(el => el === string)
