import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/error.js";
import { Job } from "../models/jobSchema.js";
import { Application } from "../models/applicationSchema.js";


export const getApplicationsWithStats = catchAsyncErrors(async (req, res, next) => {
    const employerId = req.user._id;

    const { startDate, endDate } = req.headers;

    const dateFilter = {};

    if (startDate && endDate) {
        dateFilter.createdAt = {
            $gte: new Date(startDate),
            $lte: new Date(endDate)
        };
    }

    const jobDateFilter = {};

    if (startDate && endDate) {
        jobDateFilter.jobPostedOn = {
            $gte: new Date(startDate),
            $lte: new Date(endDate)
        };
    }

    try {
        const [applicationStats, jobsPostedCount] = await Promise.all([
            Application.aggregate([
                {
                    $match: {
                        "employerInfo.id": employerId,
                        "deletedBy.employer": false,
                        ...dateFilter
                    }
                },

                {
                    $facet: {
                        viewedApplications: [
                            { $match: { viewed: true } },
                            { $count: "count" }
                        ],
                        unviewedApplications: [
                            { $match: { viewed: false } },
                            { $count: "count" }
                        ],

                    }
                }
            ]),

            // no 2
            Job.countDocuments({
                postedBy: employerId,
                ...jobDateFilter
            })
        ]);

        const viewedCount = applicationStats[0].viewedApplications[0]?.count || 0;
        const unviewedCount = applicationStats[0].unviewedApplications[0]?.count || 0;


        res.status(200).json({
            success: true,
            counts: {
                viewedApplications: viewedCount,
                unviewedApplications: unviewedCount,
                jobsPosted: jobsPostedCount
            },
            message: "Meta data for application stats fetched!"

        });
    } catch (error) {
        return next(new ErrorHandler(error?.message || "Internal Server Error!", 500))

    }
})
