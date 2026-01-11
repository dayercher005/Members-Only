import { Router } from 'express';
import { renderNewMessageForm, sendNewMessageForm } from '../../controllers/CreateNewMessage/createNewMessage.js';


export const CreateNewMessageRouter = Router();

function ensureAuthentication(request, response, next){
    if (request.isAuthenticated()){
        return next();
    }
    response.redirect('/log-in');
}

CreateNewMessageRouter.get("/", ensureAuthentication , renderNewMessageForm);
CreateNewMessageRouter.post("/", sendNewMessageForm);