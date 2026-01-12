import { body, validationResult, matchedData } from 'express-validator';

const adminFormValidation = [
    body("admin")
]

export const sendAdminForm = [
    adminFormValidation, 
    (request, response) => {
        const errors = validationResult(request)
        if (!errors.isEmpty()){
            response.status(404).render("partials/error")
        }

        const { adminPassword } = matchedData(request);
        
    },
]