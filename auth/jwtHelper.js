const jose = require('jose')

const Secret = new TextEncoder().encode(
    process.env.AUTH_JWTHELPER_SECRET
  )

async function generateJWT() {
  const jwt = await new jose.SignJWT({ 'urn:example:claim': true })
  .setProtectedHeader({ alg: 'HS256' })
  .setIssuedAt()
  .setIssuer('urn:example:issuer')
  .setAudience('urn:example:audience')
  .setExpirationTime('2h')
  .sign(Secret)
  
  console.log(jwt)
}

module.exports = {Secret, generateJWT}