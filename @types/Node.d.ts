import {Hospital} from "@elior-health/types/src";

declare global {
    namespace Express {
        export interface Request {
            validatedBody: T,
            [key: string]: T
        }
    }
}

export {};

