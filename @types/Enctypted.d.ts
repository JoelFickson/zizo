export interface Encrypted {
	hash: string;
	salt: string;
}

export interface JWTReturnData {
	token: string,
	refreshToken: string,
}
