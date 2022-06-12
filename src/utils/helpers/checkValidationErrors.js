const { validationResult } = require('express-validator')
const ApiError = require('../../errors/apiError')

/* 
  Тригерит ошибку если есть ошибки валидации чем останавливает дальнейший код
  на вход принимает объект request из express и опционально текст ошибки
*/

module.exports = (req, message = 'Ошибка валидации') => {
  const errors = validationResult(req)
    
  if(!errors.isEmpty()) {
    throw ApiError.BadRequest(message, errors.array())
  }
}

