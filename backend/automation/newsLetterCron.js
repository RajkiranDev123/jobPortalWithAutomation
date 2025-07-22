import cron from "node-cron";
import { Job } from "../models/jobSchema.js";
import { UserModel } from "../models/userSchema.js";
import { sendEmail } from "../utils/sendEmail.js";

export const newsLetterCron = () => {
    // min hour day-of-month month day-of-week
    cron.schedule("*/1 * * * *", async () => {
        
        console.log("Automation started!");
        const jobs = await Job.find({ newsLettersSent: false });//[{},{}]

        for (const job of jobs) {

            try {
                const filteredUsers = await UserModel.find({
                    $or: [{ "niches.firstNiche": job.jobNiche }, { "niches.secondNiche": job.jobNiche },
                    { "niches.thirdNiche": job.jobNiche }]
                })

                for (const user of filteredUsers) {
                    const subject = `Hot Job Alert: ${job.title} in ${job.jobNiche} Available Now`;
                    const message = `Hi ${user.name},\n\nGreat news! A new job that fits your niche has 
                    just been posted. The position is for a ${job.title} with ${job.companyName}, and they are
                     looking to hire immediately.\n\nJob Details:\n- **Position:** ${job.title}\n- **Company:** 
                     ${job.companyName}\n- **Location:** ${job.location}\n- **Salary:** ${job.salary}\n\nDon’t wait too
                      long! Job openings like these are filled quickly. \n\nWe’re here to support you in your job search. 
                      Best of luck!\n\nBest Regards,\nNicheNest Team`;

                    sendEmail({ email: user.email, subject, message });
                }

                job.newsLettersSent = true;
                await job.save();

            } catch (error) {
                return next(console.error(error || "Some error in Cron."));
            }
        }
    });
}