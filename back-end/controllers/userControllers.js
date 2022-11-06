import { User } from '../models/userModel.js'

export const updateProfile = async(req, res) => {
    const { id } = req.params
    const profileFields = req.body
    const { userId } = req

    let fields = {}
    Object.entries(profileFields).forEach(([key, value]) => {
        fields = {...profileFields, [`profile.${key}`]: value }
    })

    try {
        await User.findByIdAndUpdate(userId, { $set: fields })
        res.status(200).json({ message: `user profile ${id} has been updated` })
    } catch (error) {
        res.status(401).json(error.message)
    }

}