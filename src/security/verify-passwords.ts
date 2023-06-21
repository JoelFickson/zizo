import * as bcrypt from 'bcrypt';

const verifyPassword = (password: string, hash: string): boolean =>
	bcrypt.compareSync(password, hash);

export default verifyPassword;
