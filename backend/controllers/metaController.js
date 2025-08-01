import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/error.js";
import { Job } from "../models/jobSchema.js";
import { Application } from "../models/applicationSchema.js";


export const getApplicationsWithStats = catchAsyncErrors(async (req, res, next) => {
    const employerId = req.user._id;
    const dateRange = req.headers["date-range"]

    let startDate = dateRange?.split("--")[0] + "T00:00:00Z"
    // console.log(startDate.split("T")[0])
    let endDate = dateRange?.split("--")[1] + "T23:59:59Z"

    const dateFilter = {};
    const jobDateFilter = {};

    if (startDate.split("T")[0]!=="undefined") {

        if (startDate && endDate) {
            dateFilter.createdAt = {
                $gte: startDate,
                $lte: endDate
            };
        }


        if (startDate && endDate) {
            jobDateFilter.jobPostedOn = {
                $gte: startDate,
                $lte: endDate
            };
        }

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
