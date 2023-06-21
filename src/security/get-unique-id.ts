import crypto from 'crypto';

const generateUniqueId = (dashed = false): string => {

	const id = crypto.randomBytes(16).toString('hex');

	if (dashed) {
		const chunks = id.match(/.{4}/g) as RegExpMatchArray;
		return chunks.join('-');
	}
	return id;
};

export default generateUniqueId;
