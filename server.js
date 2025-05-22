// server/server.js
import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import helmet from 'helmet'
import dotenv from 'dotenv'

dotenv.config()

const app = express()

// Middleware
app.use(cors())
app.use(helmet())
app.use(express.json())

// Rutas base (por ahora vacías)
app.get('/', (req, res) => {
  res.send('API Estudio 513 funcionando 🚀')
})

// Conexión a MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => {
    console.log('✅ Conectado a MongoDB')
    app.listen(process.env.PORT || 5000, () =>
      console.log(`🌐 Servidor corriendo en puerto ${process.env.PORT || 5000}`)
    )
  })
  .catch((err) => console.error('❌ Error al conectar MongoDB:', err))
