import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/error.js";
import { UserModel } from "../models/userSchema.js";
import { v2 as cloudinary } from "cloudinary";
import { sendToken } from "../utils/jwtToken.js";
import { generateForgotPasswordEmailTemplate } from "../utils/emailTemplate.js"
import { validatePassword } from "../utils/validatePassword.js"


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
        const user = await UserModel.create(userData);//This line creates and saves a new document in one step.
        //but cant call instance methods like comparePassword etc
        sendToken(user, 201, res, "User is Registered.");
    } catch (error) {
        return next(new ErrorHandler("Internal Server Error!", 500))

    }
});


/////////////////////////////////////////////////// login ///////////////////////////////////////////////

export const login = catchAsyncErrors(async (req, res, next) => {
    const { role, email, password } = req.body;
    if (!role || !email || !password) {
        return next(
            new ErrorHandler("All fields are required.", 400)
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
        return next(new ErrorHandler("Internal Server Error!", 500))
    }
});


/////////////////////////////////////////////////////// logout /////////////////////////////////////

export const logout = catchAsyncErrors(async (req, res, next) => {
    return res
        .status(200)
        .cookie("token", "", {
            expires: new Date(Date.now()),// expires now!
            httpOnly: true,
        })
        .json({
            success: true,
            message: "Logged out successfully.",
        });
});

/////////////////////////////////////////////////////////// getUser /////////////////////////////////////////////

export const getUser = catchAsyncErrors(async (req, res, next) => {
    const user = req.user;
    return res.status(200).json({
        success: true,
        user,
    });
});

//////////////////////////////////////////////////////////////// update profile /////////////////////////

export const updateProfile = catchAsyncErrors(async (req, res, next) => {
    const newUserData = {
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        address: req.body.address,
        coverLetter: req.body.coverLetter,
        niches: {
            firstNiche: req.body.firstNiche,
            secondNiche: req.body.secondNiche,
            thirdNiche: req.body.thirdNiche,
        },
    };
    const { firstNiche, secondNiche, thirdNiche } = newUserData.niches;

    if (
        req.user.role === "Job Seeker" &&
        (!firstNiche || !secondNiche || !thirdNiche)
    ) {
        return next(
            new ErrorHandler("Please provide your all preferred job niches.", 400)
        );
    }
    try {
        if (req.files) {
            const resume = req.files.resume;
            if (resume) {
                const currentResumeId = req?.user?.resume?.public_id;
                if (currentResumeId) {
                    await cloudinary.uploader.destroy(currentResumeId);
                }
                const newResume = await cloudinary.uploader.upload(resume.tempFilePath, {
                    folder: "Job_Seekers_Resume",
                });
                newUserData.resume = {
                    public_id: newResume?.public_id,
                    url: newResume?.secure_url,
                };
            }
        }

        const user = await UserModel.findByIdAndUpdate(req.user.id, newUserData, {
            new: true,
            runValidators: true,
            useFindAndModify: false,
        });
        return res.status(200).json({
            success: true,
            user,
            message: "Profile updated.",
        });
    } catch (error) {
        return next(new ErrorHandler("Internal Server Error!", 500))
    }
});

///////////////////////////////////////////// update password ////////////////////
export const updatePassword = catchAsyncErrors(async (req, res, next) => {

    try {
        const user = await UserModel.findById(req?.user?.id).select("+password");//also retrive password 

        const isPasswordMatched = await user.comparePassword(req?.body?.oldPassword);

        if (!isPasswordMatched) {
            return next(new ErrorHandler("Old password is incorrect.", 400));
        }

        if (req?.body?.newPassword !== req?.body?.confirmPassword) {
            return next(
                new ErrorHandler("New password & confirm password do not match.", 400)
            );
        }

        user.password = req.body.newPassword;
        await user.save();//use when : If the document was fetched and modified!

        sendToken(user, 200, res, "Password updated successfully.");
    } catch (error) {
        return next(new ErrorHandler(error?.message, 500))
    }
});

//////////////////////////////////////////////////// forgot password //////////////////////////////////////

export const forgotPassword = catchAsyncErrors(
    async (req, res, next) => {

        if (!req.body.email) return next(new ErrorHandler("Email is required!", 400))
        const user = await UserModel.findOne({ email: req.body.email })

        if (!user) return next(new ErrorHandler("Invalid email!", 400))

        const resetToken = user.getResetPasswordToken()
        await user.save({ validateBeforeSave: false })//internally save also resetPasswordToken and resetPasswordExpire


        const message = generateForgotPasswordEmailTemplate("", resetToken)
        try {
            await sendEmail({ email: user.email, subject: "Password recovery token for Jobs4orDevs!", message })
            return res.status(200).json({ success: true, message: `Email sent to ${user.email} !` })
        } catch (error) {
            user.resetPasswordToken = undefined
            user.resetPasswordExpire = undefined
            await user.save({ validateBeforeSave: false })
            return next(new ErrorHandler(error.message || "Internal Server Error", 500))
        }
    }
)

////////////////////////////////////////////////////////// reset now /////////////////////////////////////////////////

export const resetPassword = catchAsyncErrors(
    async (req, res, next) => {
        try {
            const { token } = req.params

            const resetPasswordToken = crypto.createHash("sha256").update(token).digest("hex")

            const user = await UserModel.findOne({
                resetPasswordToken,
                resetPasswordExpire: { $gt: Date.now() }
            }).select("+password");
            // console.log(user)
            if (!user) return next(new ErrorHandler("Reset password token is invalid or expired!", 400))

            const isPasswordValid = validatePassword(req.body.password, req.body.confirmPassword)

            if (isPasswordValid) {
                return next(new ErrorHandler(isPasswordValid, 400))
            }

            // const hashedPassword = await bcrypt.hash(req.body.password, 10)
            // user.password = hashedPassword
            user.password = req.body.password;

            user.resetPasswordToken = undefined

            user.resetPasswordExpire = undefined

            await user.save()

            return res.status(200).json({ success: true, message: `Password reset done!` })

        } catch (error) {
            return next(new ErrorHandler(error.message, 500))
        }
    }
)