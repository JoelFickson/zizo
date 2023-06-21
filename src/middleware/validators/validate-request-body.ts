import { NextFunction, Request, Response } from 'express';
import z from 'zod';

const validateRequestBody = (schema: z.AnyZodObject) => async (req: Request, res: Response, next: NextFunction) => {
	try {
		req.validatedBody = await schema.parseAsync(req.body);
		next();
	} catch (error: unknown) {
		const theError = error as Error & { issues: z.ZodIssue[] };
		res.status(400).json(theError.issues);
	}
};

export default validateRequestBody;
