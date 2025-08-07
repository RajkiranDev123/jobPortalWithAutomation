import { catchAsyncErrors } from "./catchAsyncErrors.js";
import ErrorHandler from "./error.js";
import jwt from "jsonwebtoken";
import { UserModel } from "../models/userSchema.js";

export const isAuthenticated = catchAsyncErrors(async (req, res, next) => {

    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return next(new ErrorHandler("Unauthorized: No token provided", 401));
    }
    const token = authHeader.split(" ")[1];
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.user = await UserModel.findById(decoded?.id);
        if (!req.user) {
            return next(new ErrorHandler("User not found.", 401));
        }
        next();
    } catch (error) {

        return next(new ErrorHandler("Jwt is invalid or expired!.", 401));

    }
});

export const isAuthorized = (...roles) => {
    console.log("isAuthorized is called!")
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return next(
                new ErrorHandler(`${req.user.role} not allowed to access this resource.`)
            );
        }
        next();
    };
};