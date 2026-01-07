import { body, validationResult, matchedData } from 'express-validator'

const validateSignUpUser = [
    body("fullName")
    .trim(),
    body("username")
    .trim(),
    body("password")
    .trim()
]

export const sendSignUpForm = [
    validateSignUpUser, 
    (request, response) => {

        const errors = validationResult(request);
        if (!errors.array.isEmpty()){
            response.status(404).render()
        }

        const { fullName, username, password } = matchedData(request);
    }
]