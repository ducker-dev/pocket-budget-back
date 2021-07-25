import mongoose from 'mongoose'

const {Schema, model} = mongoose

const User = new Schema({
    nickname: {type: String, unique: true, required: true},
    password: {type: Array, required: true},
    notScatteredChecks: [
        {
            user: {type: String},
            retailPlaceAddres: {type: String},
            userInn: {type: String},
            ticketDate: {type: String},
            requestNumber: {type: String},
            shiftNumber: {type: String},
            operator: {type: String},
            operationType: {type: String},
            items: [
                {
                    name: {type: String},
                    price: {type: String},
                    quantity: {type: String},
                    sum: {type: String},
                }
            ],
            nds18: {type: String},
            nds: {type: String},
            nds0: {type: String},
            ndsNo: {type: String},
            totalSum: {type: String},
            cashTotalSum: {type: String},
            ecashTotalSum: {type: String},
            taxationType: {type: String},
            kktRegId: {type: String},
            kktNumber: {type: String},
            fiscalDriveNumber: {type: String},
            fiscalDocumentNumber: {type: String},
            fiscalSign: {type: String},
        }
    ],
    // scatteredChecks: {}
    // TODO - сущности:
    // раскиданные чеки
    // не раскиданные чек:
    //    - ручное добавление
    //    - сканирование чеков
    // категории:
    //    - привязка к месяцу
    // продукты (при повторении будут объединяться в базе):
    //    - привязка к категории
    //    - привязка к дате
    //    - привязка к чеку
    //    - опциональная привязка к "денежная времянка" (разделить сумму на моя/чужая)
    // текущие средства (кошельки / банковские счета)
    // начальная сумма:
    //    - привязка к месяцу
    //    - сумирование данных из "текущих средства"
    // доходы (ЗП/кешбек/пособия):
    //    - привязка к месяцу
    // неучтенная сумма денег
    //    - сверка начальной суммы, приходов и раходов с "текущие средства"
    // денежная времянка
    // совместный бюджет:
    //    - юзер с которым объединяется бюджет
    roles: [{type: String}],
})

console.log("User: ", User)

export default model('User', User)