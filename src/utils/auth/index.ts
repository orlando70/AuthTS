import { decodeToken, generateJWTToken, } from '..';
import User from '../../database/entity/User';
import moment from 'moment';
import redis from '../../database/redis';
import { TokenFlag } from '../../database/enum';

export async function createSession(user: User) {  
    const token = await generateJWTToken({ userId: user.id, flag: TokenFlag.AUTH })
    const decodedToken = await decodeToken(token);     
           
    const sessionKeyPrefix = `sessions:${user.id}`;
    const sessionKey = `${sessionKeyPrefix}:${decodedToken.counter}`;
    const expires = moment().diff(moment(decodedToken.exp), 'seconds');
    
    await redis.setex(sessionKey, expires, token);    
    await redis.sadd(sessionKeyPrefix, sessionKey);    
    await redis.expire(sessionKeyPrefix, expires);    

    return token;
}