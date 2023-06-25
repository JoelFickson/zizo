import * as bcrypt from 'bcrypt';
import * as jsonwebtoken from 'jsonwebtoken';
import crypto from 'crypto';

/**
 * Object containing various utility functions.
 *
 * @typedef {Object} UtilityFunctions
 * @property {Function} encryptPassword - Function to encrypt a password.
 * @property {Function} verifyPassword - Function to verify if a password matches a hash.
 * @property {Function} generateJwt - Function to generate a JSON Web Token (JWT).
 * @property {Function} generateRandomPassword - Function to generate a random password.
 * @property {Function} generateUniqueId - Function to generate a unique identifier.
 */
export default {

	/**
	 * Encrypts the provided password using bcrypt.
	 *
	 * @param {string} password - The password to encrypt.
	 * @returns {Encrypted} - The encrypted password and salt.
	 */
	encryptPassword: (password: string): Encrypted => {

		const salt = bcrypt.genSaltSync(14);

		const hash = bcrypt.hashSync(password, salt);

		return {
			hash,
			salt,
		};
	},
	/**
	 * Verifies if a password matches a given hash.
	 *
	 * @param {string} password - The password to verify.
	 * @param {string} hash - The hash to compare against.
	 * @returns {boolean} - Returns true if the password matches the hash, otherwise false.
	 */
	verifyPassword: (password: string, hash: string): boolean => bcrypt.compareSync(password, hash),

	/**
	 * Generates a JSON Web Token (JWT) with the provided payload and returns the token and refresh token.
	 *
	 * @template T - The type of the payload object.
	 * @param {T} obj - The payload object to include in the JWT.
	 * @returns {JWTReturnData} - The generated JWT and refresh token.
	 */
	generateJwt: <T>(obj: T): JWTReturnData => {
		const secret = process.env.JWT_SECRET as string;
		const issuer = process.env.JWT_ISSUER as string;
		const payload = {
			...obj,
			expiresAt: new Date().getTime() + (24 * 60 * 60 * 1000),
			issuer,
		};
		const token = jsonwebtoken.sign(payload, secret);

		const refreshToken = jsonwebtoken.sign({
			payload: obj,
			expiresAt: new Date().getTime() + (7 * 24 * 60 * 60 * 1000),
			issuer,
		}, secret);

		return {
			token,
			refreshToken,
		};
	},

	/**
	 * Generates a random password of the specified length.
	 *
	 * @param {number} [length=12] - The length of the password to generate. Default is 12.
	 * @returns {string} - The randomly generated password.
	 */
	generateRandomPassword: (length: number = 12) => {
		const alphabet = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
		const password = [];
		for (let i = 0; i < length; i++) {
			password.push(alphabet[Math.floor(Math.random() * alphabet.length)]);
		}
		return password.join('');
	},

	/**
	 * Generates a unique identifier.
	 *
	 * @param {boolean} [dashed=false] - Specifies whether to format the identifier with dashes. Default is false.
	 * @returns {string} - The generated unique identifier.
	 */
	generateUniqueId: (dashed = false): string => {

		const id = crypto.randomBytes(16).toString('hex');

		if (dashed) {
			const chunks = id.match(/.{4}/g) as RegExpMatchArray;
			return chunks.join('-');
		}
		return id;
	},
};