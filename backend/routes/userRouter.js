import express from "express";
import { register, login, logout, getUser, updateProfile, updatePassword, forgotPassword, resetPassword } from "../controllers/userController.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);

// only logged in user can logged out
router.get("/logout", isAuthenticated, logout);

router.get("/getuser", isAuthenticated, getUser);
router.put("/update/profile", isAuthenticated, updateProfile)
router.put("/update/password", isAuthenticated, updatePassword)

// forgot and reset password routes
router.post("/forgot/password", forgotPassword)
router.put("/reset/password/:token", resetPassword)


export default router;