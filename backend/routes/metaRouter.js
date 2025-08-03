import express from "express";
import { isAuthenticated, isAuthorized } from "../middlewares/auth.js";
import {
    getMetaEmployer,getMetaJobSeeker,getMonthlyJobCounts,pdfDownload
} from "../controllers/metaController.js";

const router = express.Router();



router.get(
    "/employer",
    isAuthenticated,
    isAuthorized("Employer"),
    getMetaEmployer
);

router.get(
    "/job-seeker",
    isAuthenticated,
    isAuthorized("Job Seeker"),
    getMetaJobSeeker
);

router.get(
    "/monthly-jobs-posted-counts",
    getMonthlyJobCounts
);

router.get(
    "/pdf",
    isAuthenticated,

    pdfDownload
);



export default router;