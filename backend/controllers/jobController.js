import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/error.js";
import { Job } from "../models/jobSchema.js";

export const postJob = catchAsyncErrors(async (req, res, next) => {
    const { title, jobType, location, companyName, introduction, responsibilities, qualifications, offers, salary, hiringMultipleCandidates,
        personalWebsiteTitle, personalWebsiteUrl, jobNiche } = req.body;

    if (!title || !jobType || !location || !companyName || !introduction || !responsibilities || !qualifications || !salary || !jobNiche) {
        return next(new ErrorHandler("Please provide full job details.", 400));
    }
    if ((personalWebsiteTitle && !personalWebsiteUrl) || (!personalWebsiteTitle && personalWebsiteUrl)) {
        return next(new ErrorHandler("Provide both the website url and title, or leave both blank.", 400));
    }
    const postedBy = req.user._id;
    try {
        const job = await Job.create({
            title, jobType, location, companyName, introduction, responsibilities, qualifications, offers, salary, hiringMultipleCandidates,
            personalWebsite: {
                title: personalWebsiteTitle,
                url: personalWebsiteUrl,
            },
            jobNiche,
            postedBy,
        });
        return res.status(201).json({ success: true, message: "Job posted Successfully.", job });
    } catch (error) {
        return next(new ErrorHandler(error?.message || "Internal Server Error", 500))
    }
});