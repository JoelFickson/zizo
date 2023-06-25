interface Encrypted {
	hash: string;
	salt: string;
}

interface JWTReturnData {
	token: string,
	refreshToken: string,
}
