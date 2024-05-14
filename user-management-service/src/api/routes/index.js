import { Router } from "express";
import userRoutes from "./User.routes.js";

const router = Router();

// User Management Endpoints
router.use("/user", userRoutes);

export default router;
