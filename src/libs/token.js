const jwt = require('jsonwebtoken');
import { secretJWT } from '../config/setting';
export const generateToken = async(data, secretKey = secretJWT) => {
    return jwt.sign(data, secretKey);
}

export const checkToken = async(token, secretKey = secretJWT) => {
    return jwt.verify(token, secretKey);
}