import express from 'express'
import mongoose from 'mongoose'
import path from 'path'
import authRoutes from './src/routes/auth.js'
import {bdUrl} from "./src/constants/config.js"

const __dirname = path.resolve()
const API_VERSION = "/api/v1"
const HOST = "localhost"
const PORT = process.env.PORT || 8000
const app = express()

async function start() {
    try {
        await mongoose.connect(bdUrl, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true})

        app.use(express.static(path.join(__dirname, 'static')))
        app.use(express.json())

        app.use(`${API_VERSION}/auth`, authRoutes)

        app.listen(PORT, () => {
            console.log(`Server is running on https://${HOST}:${PORT}`)
        })
    } catch (e) {
        console.error(e)
    }
}

start()