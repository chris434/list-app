import jwt from 'jsonwebtoken'

export const authenticateUser = async(req, res, next) => {

    try {
        const token = req.headers.authorization.split(' ')[1]
        const verifiedToken = jwt.verify(token, process.env.SECRET_TOKEN)

        req.body.adminID = verifiedToken.userId
        next()
    } catch (error) {
        res.status(401).json(error.message)
    }

}