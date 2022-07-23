const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const model = require('../models')
const keys = require('../config/keys')

module.exports.createUser = async (req, res, next) => {
    const salt = bcrypt.genSaltSync(10)
    const password = req.body.password

    try {
        const user = await model.Users.findOne({
            where: {
                email: req.body.email
            }
        })

        if(user) {
            res.status(409).json({message: "The email has already been used"});
        }

        if(!user) {
            try {
                const user = await model.Users.create({
                    name: req.body.name,
                    email: req.body.email,
                    password: bcrypt.hashSync(password, salt),
                });
                res.status(200).json(user);
            } catch (err) {
                next(err);
            }
        }
    } catch (err) {
        next(err);
    }
}

module.exports.login = async (req, res, next) => {
    try {
        const user = await model.Users.findOne({
            where: {
                email: req.body.email
            }
        })

        if(!user) {
            res.status(404).json({message: "Client with this email not found"})
        }

        if(user) {
            const passwordResult = bcrypt.compareSync(req.body.password, user.password)
            if(passwordResult) {
                const token = jwt.sign({
                    email: user.email,
                    userId: user.id
                }, keys.jwt, { expiresIn: 60 * 60 })

                res.status(200).json({ token: `Bearer ${token}` })
            }

            if(!passwordResult) {
                res.status(401).json({message: "The password does not match"})
            }
        }


    } catch (err) {
        next(err)
    }
}
