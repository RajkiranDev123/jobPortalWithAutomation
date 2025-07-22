import cron from "node-cron";
import { Job } from "../models/jobSchema.js";
import { UserModel } from "../models/userSchema.js";
import { sendEmail } from "../utils/sendEmail.js";


export const newsLetterCron = () => {
    // min hour day-of-month month day-of-week
    cron.schedule("* * * * *", async () => {
        const jobs = await Job.find({ newsLettersSent: false });
        console.log(555)
    })
}