import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import helmet from 'helmet'
import config from './config'

const app = express()

app.set('trust proxy', true)

app.use(cors())
app.use(helmet())

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(morgan(config.env.isProduction ? 'common' : 'dev'))

export default app
