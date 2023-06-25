import express from 'express';
import CityController from './Controller';
import { ZizoMiddleware } from 'zizo';
import citySchema from './city.schema';

const { validateRequestBody } = ZizoMiddleware;


const router = express.Router();

const cityController = new CityController();


router.post('/add', validateRequestBody(citySchema), cityController.addCityHandler);

export default router;
