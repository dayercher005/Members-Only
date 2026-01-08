import { body, validationResult, matchedData } from 'express-validator';
import { AddSignUpMembers } from '../../db/Queries/Create.js';

const validateSignUpUser = [
    body("fullName")
    .trim()
    .withMessage("Please Input Your Name"),
    body("username")
    .trim()
    .isEmail()
    .withMessage("Username must be an Email"),
    body("password")
    .trim(),
    body("confirmPassword")
    .trim()
    .withMessage("Passwords must match")
]

export const sendSignUpForm = [
    validateSignUpUser, 
    (request, response) => {

        const errors = validationResult(request);
        if (!errors.array.isEmpty()){
            response.status(404).render()
        }

        const { fullName, email, password } = matchedData(request);
        AddSignUpMembers(fullName, email, password);
        response.redirect("/log-in");
    }
]