interface GenericResponse {
	message: string;
	code: number;
	error: boolean,

}

interface GenericDataResponse<T> {
	data: T;
	code: number;
	error: boolean,

	[key: string]: T | string | number | boolean | null;
}

