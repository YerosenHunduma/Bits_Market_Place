import jwt from 'jsonwebtoken';
export const issueJWT = (user) => {
    return jwt.sign(user, process.env.JWT_SECRET);
};
