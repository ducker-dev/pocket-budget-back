import CryptoJS from 'crypto-js'
import {validationResult} from 'express-validator'
import {setCommonHeaders} from "../helpers/headers.js"
import {generateResponse, generateMessage, generateAccessToken} from "../helpers/requests.js"
import {cryptoKey} from "../constants/config.js"
import {EResponse} from "../constants/headers.js"
import {ERoles} from "../constants/roles.js"
import {errorsMessages, successMessages} from "../constants/messages.js"
import User from '../models/user.js'
import Role from '../models/role.js'

export const registration = async (req, res) => {
    setCommonHeaders({res, rType: EResponse.json})
    try {
        const validResult = validationResult(req)
        if (!validResult.isEmpty()) {
            res.status(400).json(generateResponse({errors: validResult.errors}))
        }

        const {nickname, password} = req.body
        const candidate = await User.findOne({nickname})
        if (candidate) {
            res.status(400).json(generateResponse({errors: [errorsMessages.userAlreadyExists]}))
        }
        const hashPassword = CryptoJS.HmacSHA512(password, cryptoKey).toString()
        const userRole = await Role.findOne({value: ERoles.USER})
        const user = new User({nickname, password: hashPassword, roles: [userRole.value]})
        await user.save()

        return res.json(generateResponse({body: successMessages.userRegistered}))
    } catch (e) {
        console.error(e)
        res.status(400).json(generateResponse({errors: [errorsMessages.somethingWentWrong]}))
    }
}

export const login = async (req, res) => {
    setCommonHeaders({res, rType: EResponse.json})
    try {
        const validResult = validationResult(req)
        if (!validResult.isEmpty()) {
            res.status(400).json(generateResponse({errors: validResult.errors}))
        }

        const {nickname, password} = req.body
        const user = await User.findOne({nickname})
        if (!user) {
            res.status(400).json(generateResponse({
                errors: generateMessage({
                    message: errorsMessages.userNotFound,
                    variables: {nickname}
                })
            }))
        }

        const hashPassword = CryptoJS.HmacSHA512(password, cryptoKey).toString()
        const isValidPassword = user.password === hashPassword
        if (!isValidPassword) {
            res.status(400).json(generateResponse({errors: [errorsMessages.incorrectLoginPassword]}))
        }
        const token = generateAccessToken({id: user._id, roles: user.roles})

        return res.json(generateResponse({body: token}))
    } catch (e) {
        console.error(e)
        res.status(400).json(generateResponse({errors: [errorsMessages.somethingWentWrong]}))
    }
}

export const users = async (req, res) => {
    setCommonHeaders({res, rType: EResponse.json})
    try {
        const users = await User.find()
        res.json(generateResponse({body: users}))
    } catch (e) {
        console.error(e)
        res.status(400).json(generateResponse({errors: [errorsMessages.somethingWentWrong]}))
    }
}

// export const users = async (req, res) => {
//     setCommonHeaders({res, rType: EResponse.json})
//     try {
//         const users = await User.find()
//         res.json(generateResponse({body: users}))
//     } catch (e) {
//         console.error(e)
//         res.status(400).json(generateResponse({errors: [errorsMessages.somethingWentWrong]}))
//     }
// }