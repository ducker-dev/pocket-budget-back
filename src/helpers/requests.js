import jwt from 'jsonwebtoken'
import {tokenKey} from "../constants/config.js"

export const generateAccessToken = ({id, roles}) => {
    const payload = {id, roles}
    return jwt.sign(payload, tokenKey, {expiresIn: '24h'})
}

export const generateResponse = ({body, errors}) => {
    if (errors) { return {status: 'error', errors} }
    if (body) { return {status: 'success', body} }
}

export const generateMessage = ({message, variables}) => {
    if (variables) {
        let processedMessage = message
        Object.keys(variables).forEach((variableKey) => {
            const variable = variables[variableKey]
            processedMessage = processedMessage.replace(`{${variableKey}}`, variable)
        })
        return processedMessage
    }
}