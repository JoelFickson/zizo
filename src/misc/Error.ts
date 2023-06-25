class CustomError<T> extends Error {
	private readonly data: T;

	private readonly statusCode: number;

	constructor(message: string, statusCode: number, data?: any) {
		super(message);
		this.name = this.constructor.name;
		this.statusCode = statusCode;
		this.data = data;
		Object.setPrototypeOf(this, new.target.prototype);
	}

	getStatusCode(): number {
		return this.statusCode;
	}

	getData(): T {
		return this.data;
	}
}

export default CustomError;