import express from "express";
import {register,login,logout} from "../controllers/userController.js";
const router= express.Router();
import { getMyProfile } from "../controllers/userController.js";
import isAuthenticated from "../middleware/authMiddleware.js";


router.route("/register").post(register);
router.route("/login").post(login);
// router.post("/register",register);
// router.post("/login",login);
router.route("/me").get(isAuthenticated, getMyProfile);
router.route("/logout").get(logout);

export default router;