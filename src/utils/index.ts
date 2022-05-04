// bcrypt hash, bcrypt compare, generatejwt, decodetoken
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import crypto from 'crypto';
import config from '../config';


export function generateRandomCode(length: number) {
    return crypto
        .randomBytes(length * 3)
        .toString('base64')
        .split('+')
        .join('')
        .split('/')
        .join('')
        .split('=')
        .join('')
        .substr(0, length);
}

export function bcryptHash(password: string) {
    return bcrypt.genSalt(config.app.saltRounds, (err, salt) => {
        bcrypt.hash(password, salt, (err, hash) => {
            return hash;
        })
    })
}

export function bcryptCompare(password: string, hash: string) {
    return bcrypt.compare(password, hash)
}

export function generateJWTToken(
    payload: Record<string, any>,
    secret: string = config.app.secret
): Promise<string | Error> {
    return new Promise((reject, resolve) => {
        jwt.sign({
            ...payload,
            counter: generateRandomCode(36)
        },
        secret,
        { expiresIn: '24h' },
        (err, token) => {
            if (err) {
                reject(err);
            }
            resolve(token as string)
        }
        );
    });
}