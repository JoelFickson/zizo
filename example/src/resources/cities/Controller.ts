import { NextFunction, Request, Response } from 'express';
import CityService from './Service';

const cityService = new CityService();

class CityController {

	async addCityHandler(req: Request, res: Response, next: NextFunction) {

		try {

			const cityInfo: City = {
				...req.validatedBody,
			};


			const response = await cityService.actionAddNewCity(cityInfo);


			if (response.error) {
				return res.status(response.code).json(response);
			}

			const { data: city, message } = response as GenericDataResponse<City>;

			return res.status(201).json({
				message,
				city,
			});

		} catch (error) {
			next(error);
		}


	}
}

export default CityController;