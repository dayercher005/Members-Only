import { Router } from 'express';
import { renderNewMessageForm, sendNewMessageForm } from '../../controllers/CreateNewMessage/createNewMessage.js';


export const CreateNewMessageRouter = Router();

CreateNewMessageRouter.get("/", renderNewMessageForm);
CreateNewMessageRouter.post("/", sendNewMessageForm);