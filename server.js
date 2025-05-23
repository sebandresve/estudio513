// server/server.js
import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import helmet from 'helmet'
import dotenv from 'dotenv'
import router from './routes/auth.js'
import bookingRoutes from './routes/bookings.js'

dotenv.config() // Cargar variables primero

const app = express()

// Middleware
app.use(express.json()) // 🛠️ Middleware para parsear JSON

// Seguridad y CORS
app.use(cors())
app.use(helmet())

app.use('/api/auth', router) // 🛣️ Rutas
app.use('/api/bookings', bookingRoutes) // 🛣️ Rutas de reservas

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
