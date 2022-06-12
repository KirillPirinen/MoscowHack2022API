const models = require('../../db/models')

/* опциональная мидлварка, парсит query вида ->
  ?add=${modelname}(c маленькой буквы)
  для запроса более одной модели 
  ?add=${modelname}?add=${modelname}?add=${modelname}
  Пока что не поддеживает вложенность!!!!!

  На вход принимает массив разрешенных для данной ручки Моделей (тут уже сс большой как они описаны в моделях)
  и второй необязательный параметр макс количество разрешенных инклюдов
*/

module.exports = (arrayPossibleModels, maxIncludeNum = 2) => {
  const dict = arrayPossibleModels.reduce((access, candidate) => {
    if(models[candidate]) {
      access[candidate.toLowerCase()] = models[candidate]
    }
    return access
  }, {})

  return (req, res, next) => {
    try {
      if(req.query?.add) {
        const normolized = Array.isArray(req.query.add) ? req.query.add : [req.query.add]
  
        req.include = normolized.reduce((acc, model) => {
          if(dict.hasOwnProperty(model) && acc.length < maxIncludeNum) {
            acc.push({ model: dict[model] })
          }
          return acc
        }, [])
      }
    } catch (err) {
      console.log(err)
    } finally {
      next()
    }
  }
}
