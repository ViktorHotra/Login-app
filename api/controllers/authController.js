const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../models/user');
const AuthServices = require('../services/authServices');

const saltRounds = 10;

// exports.userLogIn = async (req, res) => {
//     const {email, password} = req.body;
//     const user = await User.findOne({ email: email });
//     if (!user) {
//         return res.status(401).send({message: 'Wrong username'})
//     }
//     await bcrypt.compare(password, user.password, (err, matched) => {
//         if (!matched) {
//             return res.status(401).send({message: 'Wrong password'})
//         }
//         const { secret } = process.env;
//         const token = jwt.sign({
//                 userId: user.id,
//             },
//             secret,
//             {
//                 expiresIn: '60d',
//             })
//     })
//         .comparePassword(email)
//     try {
//         const user = await User.findOne({ email: req.body.email });
//         const { secret } = process.env;
//         if (!user) {
//             return res.send('User not found');
//         }
//         if (user && (await bcrypt.compare(req.body.password, user.password))) {
//             const token = await jwt.sign(
//                 {
//                     userId: user.id,
//                 },
//                 secret,
//                 {
//                     expiresIn: '60d',
//                 }
//             );
//             res.status(200).send({ user: user.email, token });
//         } else {
//             res.status(400).send('password is incorrect');
//         }
//     } catch (e) {
//         res.send(process.env.ERR_RESPONSE);
//     }
// };

exports.userLogIn = async (req, res) => {
    const userData = {
        email: req.body.email,
        password: req.body.password,
    };
    try {
        const loggedUser = await AuthServices.loginUser(userData);
        return res.status(201).json({ loggedUser, success: true, message: 'Successfully login' });
    } catch (e) {
        return res.status(400).json({ status: 400, success: false, message: 'Invalid username or password' });
    }
};

exports.userRegister = async (req, res) => {
    const userData = {
        email: req.body.email,
        password: req.body.password,
        isSober: req.body.isSober,
    };
    try {
        const savedUser = await AuthServices.createUser(userData);
        return res.status(201).json({ savedUser, success: true, message: 'Successfully created user' });
    } catch (e) {
        return res.status(400).json({ status: 400, success: false, message: 'User creation was unsuccessful' });
    }
};
