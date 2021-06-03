import jwt_decode from 'jwt-decode';

export const handleJWT = token => jwt_decode(token);
