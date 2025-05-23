import jwt from 'jsonwebtoken'

const requireAuth = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]
  if (!token) return res.status(401).json({ message: 'Token requerido' })

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.user = decoded // Tendrás: { id, role }
    next()
  } catch (err) {
    res.status(401).json({ message: 'Token inválido' })
  }
}

export default requireAuth
