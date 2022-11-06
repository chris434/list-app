import bcrypt from 'bcrypt'
import { UserFieldVerifier } from '../helpers/userFieldVerifier.js'
import jwt from 'jsonwebtoken'
import { User } from '../models/userModel.js'
import { FieldError } from '../customErrors/customErrors.js'


export const signup = async(req, res) => {
    const { email, username, password } = await req.body
    const verifier = new UserFieldVerifier(email.toString(), username.toString(), password.toString())

    try {
        switch (true) {
            //email verify
            case verifier.hasField('email'):
                throw new FieldError('email', 'email is required')
            case verifier.emailIsValid():
                throw new FieldError('email', 'invalid email')
                    //name verify
            case verifier.hasField('username'):
                throw new FieldError('username', 'username is required')
            case verifier.nameLength():
                throw new FieldError('name', 'name must be shorter than 26 letters')
                    //password verify
            case verifier.hasField('password'):
                throw new FieldError('password', 'password is required')
            case verifier.passwordHasCapitalChar():
                throw new FieldError('password', 'password must contain one capital letter')
            case verifier.passwordLength():
                throw new FieldError('password', 'password must have at least eight character')
            case verifier.passwordHasNumber():
                throw new FieldError('password', 'password must contain one number')
            case verifier.passwordHasSpecialChar():
                throw new FieldError('password', 'password must contain one special character')
            default:
                break;
        }
        const hashedPassword = await bcrypt.hash(password, 10)
        const newUser = User({ email, password: hashedPassword, username })
        await newUser.save()
        const token = jwt.sign({ userId: newUser._id }, process.env.SECRET_TOKEN, { expiresIn: '24h' })
        res.status(200).json({ message: 'user has been created', token })

    } catch (error) {

        if (error.errors) {
            res.status(401).json({ field: 'email', message: error.message })
            return
        }
        console.log(error.message)
        res.status(401).json({ field: error.field, message: error.message })
    }
}
export const login = async(req, res) => {
    const { email, password } = req.body

    try {
        const user = await User.findOne({ email })

        if (!user) {
            throw new Error('email or password are incorrect')
        }
        const correctPassword = await bcrypt.compare(password, user.password)
        if (!correctPassword) {
            throw new Error('email or password are incorrect')
        }
        const token = jwt.sign({ userId: user._id }, process.env.SECRET_TOKEN, { expiresIn: '24h' })
        res.status(200).json({ message: 'user logged in', token })

    } catch (error) {
        res.status(401).json(error.message)
    }
}