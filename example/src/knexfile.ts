const knexFile = {
	development: {
		client: 'pg',
		connection: {
			user: process.env.DB_USER,
			password: process.env.DB_PASS,
			database: process.env.DB_NAME,
			host: process.env.DB_HOST,
		},
		pool: {
			min: 2,
			max: 10,
		},
	},
};


export default knexFile;
