import { Router } from "express";
import courseRoutes from "./Course.routes.js";

const router = Router();

// Course Management Endpoints
router.use("/course", courseRoutes);

export default router;
