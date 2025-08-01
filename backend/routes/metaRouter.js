import express from "express";
import { isAuthenticated, isAuthorized } from "../middlewares/auth.js";
import {
    getApplicationsWithStatsEmployer
} from "../controllers/metaController.js";

const router = express.Router();



router.get(
    "/employer/applications-stats",
    isAuthenticated,
    isAuthorized("Employer"),
    getApplicationsWithStatsEmployer
);



export default router;