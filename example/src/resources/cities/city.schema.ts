import { z } from 'zod';

const citySchema = z.object({
	name: z.string(),
	population: z.number(),
	country: z.string(),
	coordinates: z.object({
		latitude: z.number(),
		longitude: z.number(),
	}).optional(),
});

export default citySchema;
