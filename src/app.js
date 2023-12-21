import express from 'express'
import { router as proyectsRoutes } from './routes/proyects.routes.js'
import { router as tasksRoutes } from './routes/task.routes.js'
export const app = express()


//middlewares
app.use(express.json())

app.use(proyectsRoutes)
app.use(tasksRoutes)