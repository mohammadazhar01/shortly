import express from 'express'
import { createLink, deleteLink } from '../controllers/linkController.js'
import { getList } from '../controllers/linkController.js';
import { getStats } from '../controllers/linkController.js';
import { redirectUrl } from '../controllers/linkController.js';

const linkRouter = express.Router();

linkRouter.post('/links', createLink)
linkRouter.get('/links', getList);
linkRouter.get('/links/:code', getStats);
linkRouter.delete('/links/:code', deleteLink);

export default linkRouter;