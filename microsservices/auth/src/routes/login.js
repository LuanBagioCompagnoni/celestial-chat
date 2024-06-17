import express from 'express';
import Login from '../controllers/login.js';

const routes = express.Router();

routes.post('/login', await Login.login);

export default routes;