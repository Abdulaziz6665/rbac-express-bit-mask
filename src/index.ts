import express from 'express'
import cors from 'cors'
import routes from './routes/routes'

const app = express()
const PORT = process.env.PORT || 4000

app.use(cors())
app.use(express.json())
app.use(routes)

app.listen(PORT, () => console.log(`Server running is http://localhost:${PORT}`))
