import { NextFunction, Request, Response } from 'express';
import z from 'zod';

export default {
	
	/**
	 * Validates the request body against the provided schema.
	 *
	 * @param {z.AnyZodObject} schema - The schema to validate the request body against.
	 * @returns {Function} - Express middleware function that handles the request validation.
	 * @param {Request} req - The Express request object.
	 * @param {Response} res - The Express response object.
	 * @param {NextFunction} next - The next function in the Express middleware chain.
	 * Adds a req.validatedBody as part of the request object
	 */
	validateRequestBody: (schema: z.AnyZodObject) => async (req: Request, res: Response, next: NextFunction) => {
		try {
			req.validatedBody = await schema.parseAsync(req.body);
			next();
		} catch (error: unknown) {
			const theError = error as Error & { issues: z.ZodIssue[] };
			res.status(400).json(theError.issues);
		}
	},
	/**
	 * Validates the request parameters against the provided schema.
	 *
	 * @param {z.AnyZodObject} schema - The schema to validate the request parameters against.
	 * @returns {Function} - Express middleware function that handles the request parameter validation.
	 * @param {Request} req - The Express request object.
	 * @param {Response} res - The Express response object.
	 * @param {NextFunction} next - The next function in the Express middleware chain.
	 * Adds a req.validatedBody as part of the request object
	 */
	validateRequestParams: (schema: z.AnyZodObject) => async (req: Request, res: Response, next: NextFunction) => {
		try {
			req.validatedBody = await schema.parseAsync(req.params);
			next();
		} catch (error: unknown) {
			const theError = error as Error & { issues: z.ZodIssue[] };
			res.status(400).json(theError.issues);
		}
	},
};