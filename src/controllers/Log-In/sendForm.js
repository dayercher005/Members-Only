import { body, validationResult, matchedData } from 'express-validator';
import Passport from 'passport';

const validateLogInUser = [
    body("username")
    .trim()
    .isEmail()
    .withMessage("Username must be an email"),
    body("password")
    .trim()
    .withMessage("Invalid Password")
]

export const sendLogInForm = [
    validateLogInUser, 
    (request, response, next) => {
        const errors = validationResult(request)
        if (!errors.array.isEmpty()){
            response.status(404).render()
        }

        const { username, password } = matchedData(request);

        next();
    },
    Passport.authenticate("local", {
        successRedirect: "/",
        failureRedirect: "/"
    })
]
