import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/error.js";
import { Application } from "../models/applicationSchema.js";
import { UserModel } from "../models/userSchema.js";

import { Job } from "../models/jobSchema.js";
import { v2 as cloudinary } from "cloudinary";

/////////////////////////////////////// job seeker will apply to job now ///////////////////////////////////////////////////

export const postApplication = catchAsyncErrors(async (req, res, next) => {
    const { id } = req.params; // job id
    const { name, email, phone, address, coverLetter } = req.body;
    if (!name || !email || !phone || !address || !coverLetter) return next(new ErrorHandler("All fields are required.", 400));

    const jobSeekerInfo = { id: req.user._id, name, email, phone, address, coverLetter, role: "Job Seeker" };
    try {
        const jobDetails = await Job.findById(id);
        const user = await UserModel.findById(req.user._id);


        if (!jobDetails) return next(new ErrorHandler("Job not found.", 404));

        ////////////////////////////////////////////////////////////////////////////////////////////
        const isAlreadyApplied = await Application.findOne({
            "jobInfo.jobId": id, // from req.params
            "jobSeekerInfo.id": req?.user?._id, // from auth middleware
        });

        if (isAlreadyApplied) return next(new ErrorHandler("You have already applied for this job.", 400))
        ///////////////////////////////////////////////////////////////////////////////////////////
        if (req.files && req.files.resume) {
            const { resume } = req.files;
            try {
                const cloudinaryResponse = await cloudinary.uploader.upload(
                    resume.tempFilePath, { folder: "Job_Seekers_Resume" }
                );
                if (!cloudinaryResponse || cloudinaryResponse.error) return next(new ErrorHandler("Failed to upload resume to cloudinary.", 500));

                jobSeekerInfo.resume = { public_id: cloudinaryResponse.public_id, url: cloudinaryResponse.secure_url };
            } catch (error) {
                return next(new ErrorHandler("Failed to upload resume", 500));
            }
        } else {
            if (req.user && !req.user.resume.url) {
                return next(new ErrorHandler("Please upload your resume.", 400));
            }
            jobSeekerInfo.resume = { public_id: req?.user && req?.user?.resume?.public_id, url: req?.user && req?.user?.resume?.url };
        }
        ///////////////////////////////////
        const employerInfo = {
            id: jobDetails.postedBy,
            role: "Employer",
        };
        ///////////////////////////////////
        const jobInfo = {
            jobId: id,
            jobTitle: jobDetails.title,
        };

        // push job id
        user.appliedJobIds.push(req.params.id)
        await user.save()

        /////////////////// save to db //////////////////////////////////////////////////////////
        const application = await Application.create({ jobSeekerInfo, employerInfo, jobInfo });
        return res.status(201).json({ success: true, message: "Application submitted.", application });
    } catch (error) {
        return next(new ErrorHandler("Internal Server Error!", 500))
    }

});

////////////////////////////////////////////////////get all application for particular employee that posted job ////////////////////////////////

export const employerGetAllApplication = catchAsyncErrors(
    async (req, res, next) => {
        const { _id } = req.user;//employer id 
        //
        const page = req.headers.page || 1
        const ITEM_PER_PAGE = 6
        const skip = (page - 1) * ITEM_PER_PAGE
        //

        try {
            //
            const totalDocs = await Application.countDocuments(
                {
                    "employerInfo.id": _id,
                    "deletedBy.employer": false,
                }
            )
            const pageCount = Math.ceil(totalDocs / ITEM_PER_PAGE)//pageCount is total pages 8/4=2 pages
            //
            const applications = await Application.find({
                "employerInfo.id": _id,
                "deletedBy.employer": false,
            }).skip(skip).limit(ITEM_PER_PAGE);

            return res.status(200).json({ success: true, applications, pageCount })
        } catch (error) {
            return next(new ErrorHandler(error||"Internal Server Error!", 500))
        }
    }
);

export const jobSeekerGetAllApplication = catchAsyncErrors(
    async (req, res, next) => {
        const { _id } = req.user;//jobSeeker id 
        //
        const page = req.headers.page || 1
        const ITEM_PER_PAGE = 5
        const skip = (page - 1) * ITEM_PER_PAGE
        //
        try {
            //
            const totalDocs = await Application.countDocuments(
                {
                    "jobSeekerInfo.id": _id,
                    "deletedBy.jobSeeker": false
                }
            )
            const pageCount = Math.ceil(totalDocs / ITEM_PER_PAGE)//pageCount is total pages 8/4=2 pages
            //
            const applications = await Application.find({
                "jobSeekerInfo.id": _id,
                "deletedBy.jobSeeker": false,
            }).populate('jobInfo.jobId').skip(skip).limit(ITEM_PER_PAGE);


            return res.status(200).json({ success: true, applications, pageCount });

        } catch (error) {
            return next(new ErrorHandler(error?.message || "Internal Server Error!", 500))
        }
    }
);

////////////////////////////////////////// delete application ///////////////////////////////////

export const deleteApplication = catchAsyncErrors(async (req, res, next) => {
    const { id } = req.params;
    try {
        const application = await Application.findById(id);
        if (!application) {
            return next(new ErrorHandler("Application not found.", 404));
        }
        const { role } = req.user;
        switch (role) {
            case "Job Seeker":
                application.deletedBy.jobSeeker = true;
                await application.save();
                break;
            case "Employer":
                application.deletedBy.employer = true;
                await application.save();
                break;

            default:
                console.log("Default case for application delete function.");
                break;
        }

        if (application.deletedBy.employer === true && application.deletedBy.jobSeeker === true) {
            await application.deleteOne();
        }
        return res.status(200).json({
            success: true,
            message: "Application Deleted.",
        });
    } catch (error) {
        return next(new ErrorHandler("Internal Server Error!", 500))
    }
});

///////////////////////////////////////////// viewed application /////////////////////////
export const employerViewedApplication = catchAsyncErrors(
    async (req, res, next) => {

        const { id } = req.params;//application id
        console.log("id from viewed",id)

        try {
            const application = await Application.findById(id);
            if (application.viewed == true) {
                return next(new ErrorHandler("Application already set as viewed.", 400));
            }

            const updatedUser = await Application.findByIdAndUpdate(
                id,
                { $set: { viewed: true } },
                { new: true }
            );

            return res.status(200).json({ success: true, message: "Application Viewed.", updatedUser })
        } catch (error) {
            return next(new ErrorHandler(error?.message||"Internal Server Error!", 500))
        }
    }
);