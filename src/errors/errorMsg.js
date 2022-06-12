const { validator: { password } } = require('../../.serverrc')

module.exports = {
  validation: {
    first_name: "Укажите имя",
    last_name: "Укажите фамилию",
    email: "Некорректный email",
    passwordLen: `Пароль должен быть не менee ${password.min} и не более ${password.max} символов`,
    passwordSimple: `Пароль должен быть не менee ${password.min} и не более ${password.max} символов`,
    phone: "Некорректный номер телефона",
    role: "Вы должны указать роль пользователя",
    invalidRole: "Некорректная роль",
    sex: "Укажите ваш пол",
    bio: "Расскажите о себе",
    photoPath: "Неверная ссылка на картинку",
    comment: "Комментарий не может быть пустым",
    score: "Некорректный оценка"
  },
  auth: {
    userNotFound: 'Пользователь не найден',
    confirmationNotFound: 'Ссылка активации не найдена',
    wrongPassword: 'Пароль неверный',
    userAlreadyExists: (coincidence, user) => `Пользователь ${coincidence === 'email' ? "c такой почтой" : `с таким телефоном (ваша почта: ${user.email})`} уже существует авторизируйтесь`,
    emailUnconfirmed: 'Не удалось активировать почту, попробуйте еще раз'
  },
  access: {
    denied: 'У вас нет прав, потому что вы в РФ'
  },
  tasks: {
    notCreated: 'что то пошло не так...'
  }
}
