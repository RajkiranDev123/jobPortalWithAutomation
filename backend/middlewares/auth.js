import { catchAsyncErrors } from "./catchAsyncErrors.js";
import ErrorHandler from "./error.js";
import jwt from "jsonwebtoken";
import { UserModel } from "../models/userSchema.js";

export const isAuthenticated = catchAsyncErrors(async (req, res, next) => {
    console.log("isAuthenticated is called!")

    const { token } = req.cookies;
    // console.log("cookie",token)
    if (!token) {
        return next(new ErrorHandler("User is not authenticated.", 400));
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    // console.log("decoded",decoded)

    req.user = await UserModel.findById(decoded?.id);


    next();
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