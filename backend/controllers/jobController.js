import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/error.js";
import { Job } from "../models/jobSchema.js";

///////////////////////////////////////// post job ///////////////////////////////////////////////////////

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

/////////////////////////////////////////////////// get all jobs /////////////////////////////////////////////////////
export const getAllJobs = catchAsyncErrors(async (req, res, next) => {
    const { city, niche, searchKeyword } = req.query;
    const query = {};
    if (city) {
        query.location = city;
    }
    if (niche) {
        query.jobNiche = niche;
    }
    if (searchKeyword) {

        query.$or = [
            { title: { $regex: searchKeyword, $options: "i" } },
            { companyName: { $regex: searchKeyword, $options: "i" } },
            { introduction: { $regex: searchKeyword, $options: "i" } },
        ];
    }
    try {
        const jobs = await Job.find(query);
        return res.status(200).json({
            success: true,
            jobs,
            count: jobs.length,
        });
    } catch (error) {
        return next(new ErrorHandler("Internal Server Error!", 500))
    }
});

/////////////////////////////////////////////////////// get my job : by poster id ///////////////////////////////////////////////
export const getMyJobs = catchAsyncErrors(async (req, res, next) => {
    const myJobs = await Job.find({ postedBy: req.user._id });
    return res.status(200).json({
        success: true,
        myJobs,
    });
});

///////////////////////////////////////////////////////////////////////////////////// delete ////////////////////////////////////

export const deleteJob = catchAsyncErrors(async (req, res, next) => {
    const { id } = req.params;
    try {
        const job = await Job.findById(id);

        if (!job) {
            return next(new ErrorHandler("Oops! Job not found.", 404));
        }
        await job.deleteOne();
        res.status(200).json({
            success: true,
            message: "Job deleted.",
        });
    } catch (error) {
        return next(new ErrorHandler(error.message || "Internal Server Error!", 500))
    }
});

/////////////////////////////////////////////////////////////// get a job by id //////////////////////////////////////

export const getSingleJob = catchAsyncErrors(async (req, res, next) => {
    const { id } = req.params;
    try {
        const job = await Job.findById(id);
        if (!job) {
            return next(new ErrorHandler("Job not found.", 404));
        }
        return res.status(200).json({
            success: true,
            job,
        });
    } catch (error) {
        return next(new ErrorHandler("Internal Server Error!", 500))
    }
});