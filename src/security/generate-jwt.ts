import * as jsonwebtoken from 'jsonwebtoken';
import {JWTReturnData} from "../../@types/Enctypted";


const generateJwt = <T>(obj: T): JWTReturnData => {
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
};

export default generateJwt;
