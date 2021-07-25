import jwt from "jsonwebtoken"
import {generateResponse} from "../helpers/requests.js"
import {errorsMessages} from "../constants/messages.js"
import {tokenKey} from "../constants/config.js"

export const allowAccess = (allowedRoles) => (req, res, next) => {
    if (req.method === "OPTIONS") {
        next()
    }

    try {
        const token = req.headers.authorization.split(' ')[1]
        const {roles: userRoles} = jwt.verify(token, tokenKey)
        const isAdmin = allowedRoles.reduce((accessState, allowedRole) => {
            if (userRoles.includes(allowedRole)) {
                return true
            }
            return accessState
        }, false)

        if (!isAdmin) {
            res.status(403).json(generateResponse({errors: [errorsMessages.adminAccessOnly]}))
        }
        next()
    } catch (e) {
        console.error(e)
        return res.status(403).json(generateResponse({errors: [errorsMessages.tokenProblem]}))
    }
}