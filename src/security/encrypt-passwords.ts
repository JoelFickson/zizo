import * as bcrypt from 'bcrypt';
import { Encrypted } from '../../@types/Enctypted';

const encryptPassword = (password: string): Encrypted => {

	const salt = bcrypt.genSaltSync(14);

	const hash = bcrypt.hashSync(password, salt);

	return {
		hash,
		salt,
	};
};

export default encryptPassword;
