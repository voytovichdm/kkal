const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const model = require('../models')
const keys = require('../config/keys')

const option = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: keys.jwt
}

module.exports = passport => {
    passport.use(
        new JwtStrategy(option, async (payload, done) => {
            try {
                const user = await model.Users.findByPk(payload.userId)

                if(user) {
                    done(null, user)
                }
                else {
                    done(null, false)
                }
            } catch (err) {
                console.log(err)
            }
        })
    )
}


