import jwt from 'jsonwebtoken'

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]
  if (!token) return res.status(401).json({ message: 'Acceso denegado.' })

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET)
    req.user = verified
    next()
  } catch (err) {
    res.status(401).json({ message: 'Token inválido.' })
  }
}

export default verifyToken
