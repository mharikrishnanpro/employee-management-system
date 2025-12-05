import express from "express";
import {
  addEmployee,
  listEmployees,
  getEmployee,
  editEmployee,
  deleteEmployee,
} from "../controllers/employeeController.js";

import protect from "../middleware/authMiddleware.js";
import adminOnly from "../middleware/roleMiddleware.js";
import upload from "../middleware/upload.js";

const router = express.Router();

router
  .route("/")
  .get(protect, listEmployees)
  .post(protect, adminOnly, upload.single("profileImage"), addEmployee);

router
  .route("/:id")
  .get(protect, getEmployee)
  .put(protect, adminOnly, upload.single("profileImage"), editEmployee)
  .delete(protect, adminOnly, deleteEmployee);

export default router;
