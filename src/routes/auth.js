import {Router} from "express"
import {check} from 'express-validator'
import {errorsMessages} from "../constants/messages.js"
import {ERoles} from "../constants/roles.js"
import {registration, login, users} from '../controllers/auth.js'
import {generateMessage} from "../helpers/requests.js"
import {allowAccess} from "../middleware/allowAccess.js"

const router = Router()

router.post('/registration', [
    check(
        'nickname',
        generateMessage({
            message: errorsMessages.fieldIsEmpty,
            variables: {fieldName: 'nickname'}
        })
    ).notEmpty(),
    check(
        'password',
        generateMessage({
            message: errorsMessages.dimensionParameters,
            variables: {fieldName: 'password', min: 8, max: 20}
        })
    ).isLength({min: 8, max: 20})
], registration)

router.post('/login', [
    check('nickname', generateMessage({
        message: errorsMessages.fieldIsEmpty,
        variables: {fieldName: 'nickname'}
    })).notEmpty(),
    check('password', generateMessage({
        message: errorsMessages.dimensionParameters,
        variables: {fieldName: 'password', min: 8, max: 20}
    })).isLength({min: 8, max: 20})
], login)

router.get('/add/check', allowAccess([ERoles.USER]), users)

router.get('/users', allowAccess([ERoles.ADMIN]), users)

export default router
