import CityRepository from './Repository';
import database from '@config/database';

class CityService {

	private readonly cityRepository;

	constructor() {
		this.cityRepository = new CityRepository(database);
	}

	async actionAddNewCity(city: City): Promise<GenericResponse | GenericDataResponse<City>> {

		try {

			const isRecordExists = await this.cityRepository.recordExists('hospitals', 'name', city.name);

			if (isRecordExists) {
				return {
					message: 'City already exists',
					code: 404,
					error: true,
				};
			}

			const response = await this.cityRepository.addCity(city);
			if (!response) {
				return {
					message: 'Adding new city  failed',
					code: 500,
					error: true,
				};
			}

			return {
				message: 'City created successfully',
				data: response,
				code: 201,
				error: false,
			};

		} catch (error) {
			const e = error as Error;
			return {
				message: `Something wrong happened ${e.message}`,
				code: 400,
				error: true,
			};
		}

	}
}

export default CityService;