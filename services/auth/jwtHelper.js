const jose = require('jose')

const Secret = new TextEncoder().encode(
    process.env.AUTH_JWTHELPER_SECRET
  )
const tokenExpirationTime = process.env.AUTH_JWTHELPER_TOKENEXPIRATIONTIME

console.log('Auth JWTHelper Secret ---> ', process.env.AUTH_JWTHELPER_SECRET)
async function generateJWT(user) {
  const jwt = await new jose.SignJWT({ 
    'username': user.username,
    'roles': user.roles,
  })
  .setProtectedHeader({ alg: 'HS256' })
  .setIssuedAt()
  .setExpirationTime(tokenExpirationTime)
  .sign(Secret)
  
  console.log(jwt)
  return jwt
}

module.exports = {Secret, generateJWT}