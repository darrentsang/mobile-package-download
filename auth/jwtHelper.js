const jose = require('jose')

const Secret = new TextEncoder().encode(
    'Hello world!',
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

//generateJWT()
module.exports = {Secret, generateJWT}