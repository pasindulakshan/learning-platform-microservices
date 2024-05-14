import { Router } from "express";
import userRoutes from "./User.routes";

const router = Router();

// User Management Endpoints
router.use("/user", userRoutes);

export default router;
