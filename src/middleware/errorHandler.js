const ApiError = require('../errors/apiError');

/* 
  Обработчик ошибок express
  Ловит все обычные ошибки и ошибки, которые мы можем выбросить намеренно
  Если выбросить ошибку внутреннего класса ApiError вернет на фронт json такой структуры: 

  {
    "message": text,
    "errors": []
  }

  и соответствующий статус

*/

module.exports = function(err, req, res, next) {
  if(err instanceof ApiError) {
    const { message, status, errors } = err
    return res.status(status).json({ message, errors })
  }
  return res.status(500).json({ error:`Что-то пошло не по плану...\r\n${ err.message }`})
}
