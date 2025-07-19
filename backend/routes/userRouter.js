import express from "express";
import { register, login, logout, getUser } from "../controllers/userController.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);

// only logged in user can logged out
router.get("/logout", isAuthenticated, logout);

router.get("/me", isAuthenticated, getUser);
// router.put("/update/profile", isAuthenticated, updateProfile)
// router.put("/update/password", isAuthenticated, updatePassword)

export default router;