const fieldsMap = {
  first_name: 'имя',
  last_name: 'фамилия',
  phone: 'телефон',
  email: 'почта',
  password: 'пароль',
  bio: 'о себе',
  avatar: 'аватар',
  rating: 'рейтинг',
  sex: 'пол',
}

module.exports = (params) => {
  let prepeared = params
  if(!Array.isArray(params) && typeof params === 'object') {
    prepeared = Object.keys(params)
  }
  return prepeared.reduce((acc, param) => {
    if(fieldsMap.hasOwnProperty(param)) acc.push(fieldsMap[param])
    return acc
  }, [])
}
