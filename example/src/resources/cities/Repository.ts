import { Knex } from 'knex';
import { ZizoDataAccessor } from 'zizo';

class CityRepository extends ZizoDataAccessor implements CityInterface {

	constructor(db: Knex) {
		super(db);
	}

	async addCity(city: City): Promise<City> {
		return this.save('cities', city);
	}

	getCities(): Promise<City[]> {
		return this.getAllRecords('cities');
	}

	async getCity(cityId: string): Promise<City> {
		return this.selectRecord('cities', 'id', cityId);
	}

	updateCity(cityId: string, city: Partial<City>): Promise<City> {
		return this.updateRecord('hospitals', cityId, city);
	}

}

export default CityRepository;