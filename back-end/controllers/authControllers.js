import bcrypt from 'bcrypt'
import { UserFieldVerifier } from '../helpers/userFieldVerifier.js'
import jwt from 'jsonwebtoken'
import { User } from '../models/userModel.js'
import { FieldError } from '../customErrors/customErrors.js'


export const signup = async(req, res) => {
    const { email, name, password } = await req.body
    const verifier = new UserFieldVerifier(email.toString(), name.toString(), password.toString())

    try {
        switch (true) {
            //email verify
            case verifier.hasField('email'):
                throw new FieldError('email', 'email is required')
            case verifier.emailIsValid():
                throw new FieldError('email', 'invalid email')
                    //name verify
            case verifier.hasField('name'):
                throw new FieldError('name', 'name is required')
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
        const newUser = User({ email, password: hashedPassword, name })
        await newUser.save()
        const token = jwt.sign({ userId: newUser._id }, process.env.SECRET_TOKEN, { expiresIn: '24h' })
        res.json({ message: 'user has been created', token })

    } catch (error) {

        if (error.errors) {
            res.json({ field: 'email', message: error.message })
            return
        }
        console.log(error.message)
        res.json({ field: error.field, message: error.message })
    }
}