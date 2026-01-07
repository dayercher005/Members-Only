import { body, validationResult, matchedData } from 'express-validator';

const validateLogInUser = [
    body("username")
    .trim(),
    body("password")
    .trim()
]

export const sendLogInForm = [
    validateLogInUser, 
    (request, response) => {
        const errors = validationResult(request);
        if (!errors.array.isEmpty()){
            return response.status(404).render()
        }

        const { username, password } = matchedData(request);
        
    }
]