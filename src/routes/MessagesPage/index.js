import { Router } from 'express';
import { renderIndexPage } from '../../controllers/MessagesPage/renderIndex.js';

export const IndexRouter = Router();

IndexRouter.get("/", renderIndexPage);