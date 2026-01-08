import { body, validationResult, matchedData } from 'express-validator';
import { AddSignUpMembers } from '../../db/Queries/Create.js';

const validateSignUpUser = [
    body("fullName")
    .trim(),
    body("username")
    .trim()
    .isEmail()
    .withMessage("Username must be an Email"),
    body("password")
    .isLength({min: 5})
    .withMessage("Password must have a minimum of 5 characters"),
    body("confirmPassword").custom((confirmPassword, {request}) => {
        if (confirmPassword !== request.body.password){
            return Error('Passwords do not match!')
        }
        return true
    })
]

export const sendSignUpForm = [
    validateSignUpUser, 
    (request, response) => {

        const errors = validationResult(request);
        if (!errors.isEmpty()){
            response.status(404).render("partials/error")
        }

        const { data } = matchedData(request);
        const { fullName, username, password, confirmPassword } = data;
        AddSignUpMembers(fullName, username, password)
        response.redirect("/log-in");
    }
]