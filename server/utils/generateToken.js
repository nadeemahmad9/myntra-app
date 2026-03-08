const jwt = require("jsonwebtoken")

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    
    expiresIn: "100d",
    
  })
}
console.log("Signing with secret:", process.env.JWT_SECRET)

module.exports = generateToken
