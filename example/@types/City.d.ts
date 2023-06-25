interface City {
	name: string;
	population: number;
	country: string;
	coordinates?: {
		latitude: number;
		longitude: number;
	};
}

interface CityInterface {
	addCity: (city: City) => Promise<City>;
	getCities: () => Promise<City[]>;
	getCity: (cityId: string) => Promise<City>;
	updateCity: (cityId: string, city: Partial<City>) => Promise<City>;
}