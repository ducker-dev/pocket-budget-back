export const errorsMessages = {
    fieldIsEmpty: 'Поле {fieldName} не должно быть пустым',
    dimensionParameters: 'Поле {fieldName} должно быть более {min} и менее {max} символов',
    userAlreadyExists: 'Пользователь с таким никнеймом уже существует',
    userNotFound: 'Пользователь {nickname} не найден',
    incorrectLoginPassword: 'Логин или пароль указаны не верно',
    somethingWentWrong: 'Что-то пошло не так, обратитесь к администратору',
    tokenProblem: 'Персональный токен отсутствует и передан с ошибкой',
    adminAccessOnly: 'Доступ разрешен только для админов',
}

export const successMessages = {
    userRegistered: 'Пользователь был успешно зарегистрирован',
}