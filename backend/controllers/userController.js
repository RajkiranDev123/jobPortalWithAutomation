import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/error.js";
import { UserModel } from "../models/userSchema.js";
import { v2 as cloudinary } from "cloudinary";
import { sendToken } from "../utils/jwtToken.js";


export const register = catchAsyncErrors(async (req, res, next) => {
    try {
        const { name, email, phone, address, password, role, firstNiche, secondNiche, thirdNiche, coverLetter } = req.body;

        if (!name || !email || !phone || !address || !password || !role) {
            return next(new ErrorHandler("All fileds are required.", 400));
        }
        if (role === "Job Seeker" && (!firstNiche || !secondNiche || !thirdNiche)) {
            return next(
                new ErrorHandler("Please provide your preferred job niches.", 400)
            );
        }
        const existingUser = await UserModel.findOne({ email });
        if (existingUser) {
            return next(new ErrorHandler("Email is already registered.", 400));
        }
        const userData = { name, email, phone, address, password, role, niches: { firstNiche, secondNiche, thirdNiche }, coverLetter };
        if (req.files && req.files.resume) {
            const { resume } = req.files;
            if (resume) {
                try {
                    const cloudinaryResponse = await cloudinary.uploader.upload(
                        resume.tempFilePath,
                        { folder: "Job_Seekers_Resume" }
                    );
                    if (!cloudinaryResponse || cloudinaryResponse.error) {
                        return next(
                            new ErrorHandler("Failed to upload resume to cloud.", 500)
                        );
                    }
                    userData.resume = {
                        public_id: cloudinaryResponse.public_id,
                        url: cloudinaryResponse.secure_url,
                    };
                } catch (error) {
                    return next(new ErrorHandler("Failed to upload resume", 500));
                }
            }
        }
        const user = await UserModel.create(userData);//save in db
        sendToken(user, 201, res, "User is Registered.");
    } catch (error) {
        next(error);
    }
});


/////////////////////////////////////////////////// login ///////////////////////////////////////////////

export const login = catchAsyncErrors(async (req, res, next) => {
    const { role, email, password } = req.body;
    if (!role || !email || !password) {
        return next(
            new ErrorHandler("Email, password and role are required.", 400)
        );
    }
    try {
        const user = await UserModel.findOne({ email }).select("+password");
        if (!user) {
            return next(new ErrorHandler("Invalid email or password.", 400));
        }
        const isPasswordMatched = await user.comparePassword(password);
        if (!isPasswordMatched) {
            return next(new ErrorHandler("Invalid email or password.", 400));
        }
        if (user.role !== role) {
            return next(new ErrorHandler("Invalid user role.", 400));
        }
        sendToken(user, 200, res, "User logged in successfully.");
    } catch (error) {
        next(error)
    }
});