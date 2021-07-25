import mongoose from 'mongoose'
const {Schema, model} = mongoose

const Receipt = new Schema({
    value: {type: String, unique: true, default: 'USER'},
})

export default model('Receipt', Receipt)