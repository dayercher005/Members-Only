import { Router } from 'express';
import { renderIndexPage } from '../../controllers/MessagesPage/renderIndex.js';
import { renderIndividualMessages } from '../../controllers/MessagesPage/renderIndividualMessages.js';
import { ensureAuthentication } from '../../config/passport.js'

export const IndexRouter = Router();

IndexRouter.get("/", renderIndexPage);