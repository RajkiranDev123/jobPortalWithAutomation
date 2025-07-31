import express from "express";
import { isAuthenticated, isAuthorized } from "../middlewares/auth.js";
import {
    getApplicationsWithStats
} from "../controllers/metaController.js";

const router = express.Router();



router.get(
    "/applications-stats",
    isAuthenticated,
    isAuthorized("Employer"),
    getApplicationsWithStats
);



export default router;