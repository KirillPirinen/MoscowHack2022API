
/* 
  Декоратор для middleware чтобы не было необходимости оборачивать операции в try {} catch {}
  При возникновении ошибки внутри middleware код останавливается и ошибка отдается обработчику ошибок
  express.
*/

module.exports = (middleware) => (req, res, next) => middleware(req, res, next).catch((err) => {
    console.error(err)
    next(err)
})
