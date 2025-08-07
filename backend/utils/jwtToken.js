export const sendToken = (user, statusCode, res, message) => {
    const token = user.getJWTToken();
    const refreshToken = user.generateRefreshToken()
     res.status(statusCode).json({
        success: true,
        user,
        message,
        token,
        refreshToken
    });
};