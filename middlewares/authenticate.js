const jwt = require('jsonwebtoken')

const SECRET_KEY = process.env.SECRET_KEY

const authenticate = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1]
    const decoded = jwt.verify(token, SECRET_KEY, function (err, decoded) {
        if (err) {
            
            res.send({msg : "Please Login again"})

        } else {
            return decoded
        }
    });



    

    if (decoded) {
        req.body.UserID = decoded.UserID
        next()
    } else {
        res.send({msg : "Please Login again"})
    }



}

module.exports = { authenticate }