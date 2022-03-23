const expressJwt = require('express-jwt');

const authJwt = () => {
    const secret = process.env.secret
    const api = process.env.API_URL
    return expressJwt({
        secret,
        algorithms: ['HS256']
    }).unless({
        path: [
            `${api}/login`,
            `${api}/register`
        ]
    })
}

module.exports = authJwt
