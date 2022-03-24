const {User} = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const saltRounds = 10

exports.userLogIn = async (req, res) => {
    try {
        const user = await User.findOne({email: req.body.email})
        const secret = process.env.secret
        if (!user) {
            return res.send('User not found')
        }
        if (user && await bcrypt.compare(req.body.password, user.password)) {
            const token = await jwt.sign(
                {
                    userId: user.id,
                },
                secret, {
                    expiresIn: '100d'
                }
            )
            res.status(200).send({user: user.email, token: token})
        } else {
            res.status(400).send('password is incorrect')
        }
    } catch (e) {
        res.send(process.env.ERR_RESPONSE)
    }
}

exports.userRegister = async (req, res) => {
    try {
        const salt = await bcrypt.genSalt(saltRounds)

        let user = new User({
            email: req.body.email,
            password: await bcrypt.hash(req.body.password, salt),
            isSober: req.body.isSober
        })
        await user.save()
        res.json(process.env.SUCCESS_RESPONSE)
    } catch (e) {
        res.json(process.env.ERR_RESPONSE)
    }
}
