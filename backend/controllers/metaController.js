import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/error.js";
import { Job } from "../models/jobSchema.js";
import { Application } from "../models/applicationSchema.js";


export const getMetaEmployer = catchAsyncErrors(async (req, res, next) => {
    const employerId = req.user._id;
    const dateRange = req.headers["date-range"]



    const dateFilter = {};
    const jobDateFilter = {};
    if (typeof dateRange === "string" && dateRange.includes("--")) {
        const [start, end] = dateRange.split("--");

        const startDate = new Date(start + "T00:00:00Z");
        const endDate = new Date(end + "T23:59:59Z");

        dateFilter.createdAt = {
            $gte: startDate,
            $lte: endDate
        };

        jobDateFilter.jobPostedOn = {
            $gte: startDate,
            $lte: endDate
        };

        console.log("createdAt:", dateFilter);
        console.log("jobPostedOn:", jobDateFilter);
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

//getMetaJobSeeker

export const getMetaJobSeeker = catchAsyncErrors(async (req, res, next) => {
    const jobSeekerId = req.user._id;
    const dateRange = req.headers["date-range"]
    const dateFilter = {};

    if (typeof dateRange === "string" && dateRange.includes("--")) {
        const [start, end] = dateRange.split("--");

        const startDate = new Date(start + "T00:00:00Z");
        const endDate = new Date(end + "T23:59:59Z");

        dateFilter.createdAt = {
            $gte: startDate,
            $lte: endDate
        };
        // console.log("createdAt:", dateFilter);
    }

    try {
        const [appliedCounts] = await Promise.all([

            Application.countDocuments({
                "jobSeekerInfo.id": jobSeekerId,
                "deletedBy.jobSeeker": false,
                ...dateFilter
            })
        ]);

        res.status(200).json({
            success: true,
            counts: {
                appliedCounts: appliedCounts
            },
            message: "Meta data for job seeker  fetched!"

        });
    } catch (error) {
        return next(new ErrorHandler(error?.message || "Internal Server Error!", 500))

    }
})


//monthly job count
export const getMonthlyJobCounts = catchAsyncErrors(async (req, res, next) => {

    const year = parseInt(req.query.year) || new Date().getFullYear();

    try {
        // Aggregate job counts grouped by month
        const result = await Job.aggregate([
            {
                $match: {
                    jobPostedOn: {
                        $gte: new Date(`${year}-01-01T00:00:00Z`),
                        $lte: new Date(`${year}-12-31T23:59:59Z`)
                    }
                }
            },
            {
                $group: {
                    _id: { month: { $month: "$jobPostedOn" } },
                    count: { $sum: 1 }
                }
            }
            //groups documents by month (extracted from the jobPostedOn date field), and then counts how many jobs were posted in each month.
        ]);

        // Initialize all 12 months
        const allMonths = Array.from({ length: 12 }, (_, i) => ({
            month: i + 1,
            name: new Date(2000, i).toLocaleString("default", { month: "short" }),
            count: 0
        }));

        //  Merge actual data into the full list
        result.forEach(({ _id, count }) => {
            const index = allMonths.findIndex(m => m.month === _id.month);
            if (index > -1) {
                allMonths[index].count = count;
            }
        });

        return res.status(200).json({
            success: true,
            year,
            data: allMonths,
            message: "All month counts fetched!"
        });
    } catch (error) {

        return next(new ErrorHandler(error?.message || "Internal Server Error!", 500))

    }
});
