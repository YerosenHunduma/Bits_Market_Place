import bcrypt from 'bcryptjs';

export const hashedPassword = async (password) => {
    try {
        const salt = await bcrypt.genSalt(10);

        return await bcrypt.hash(password, salt);
    } catch (error) {
        next(error);
    }
};
