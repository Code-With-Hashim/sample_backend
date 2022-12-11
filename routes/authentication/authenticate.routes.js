const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

const { UserSchema } = require("../../modals/authentication/authenticate.modals")

const UserRoutes = express.Router()
const SECRET_KEY = process.env.SECRET_KEY

UserRoutes.post("/signup", async (req, res) => {
    const { name, email, password, age } = req.body

    try {

        const existingUser = await UserSchema.findOne({ email })

        if (existingUser) {
            res.status(404).send('User already exist')
        } else {
            bcrypt.hash(password, 5, async (err, hash) => {
                // Store hash in your password DB.

                if (err) {
                    res.status(404).send('Something went wrong')
                } else {
                    const user = new UserSchema({ name, email, password: hash, age })
                    await user.save()
                    res.send({
                        msg : 'User Created Successfully'
                    })
                }

            });
        }

    } catch (error) {
        res.status(404).send('Something went wrong')
    }

})


UserRoutes.post("/login", async (req, res) => {
    const { email, password } = req.body

    try {

        const existingUser = await UserSchema.findOne({ email })

        if (existingUser) {

            bcrypt.compare(password, existingUser.password, (err, result) => {
                if (result) {
                    const token = jwt.sign({ UserID: existingUser._id }, SECRET_KEY);
                    res.send({ msg: "Login Successfully", token })

                } else {
                    res.status(401).send({ msg: "Login failed" })
                }
            });

        } else {
            res.status(401).send({ msg: "Login failed" })
        }

    } catch (error) {
        res.status(404).send({ msg: 'Something went wrong' })
    }

})


module.exports = { UserRoutes }