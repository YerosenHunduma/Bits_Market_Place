import jwt from 'jsonwebtoken';
export const issueJWT = (user) => {
    return jwt.sign({ _id: user }, process.env.JWT_SECRET);
};
