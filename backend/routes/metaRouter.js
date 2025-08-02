import express from "express";
import { isAuthenticated, isAuthorized } from "../middlewares/auth.js";
import {
    getMetaEmployer,getMetaJobSeeker
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



export default router;