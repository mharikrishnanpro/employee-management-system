import Employee from "../models/Employee.js";
import {
  buildEmployeeQuery,
  getPagination,
  getSort,
} from "../utils/employeeQuery.js";
import asyncHandler from "express-async-handler";
import buildImageUrl from "../utils/buildImageUrl.js";

// ---------------------- Add Employee ----------------------
export const addEmployee = asyncHandler(async (req, res) => {
  const { name, email, phone, designation, salary } = req.body;

  if (!name || !email || !phone || !designation || !salary) {
    res.status(400);
    throw new Error("All fields except profile image are required");
  }

  const imageUrl = req.file ? buildImageUrl(req, req.file.filename) : null;

  const employee = await Employee.create({
    name,
    email,
    phone,
    designation,
    salary,
    profileImage: imageUrl,
  });

  res.status(201).json({
    message: "Employee added",
    employee,
  });
});

// ---------------------- List Employees ----------------------
export const listEmployees = asyncHandler(async (req, res) => {
  const filter = buildEmployeeQuery(req.query);
  const sort = getSort(req.query);
  const { skip, limit } = getPagination(req.query);

  const employees = await Employee.find(filter)
    .sort(sort)
    .skip(skip)
    .limit(limit);

  const total = await Employee.countDocuments(filter);

  res.status(200).json({
    total,
    count: employees.length,
    employees,
  });
});

// ---------------------- Get Single Employee ----------------------
export const getEmployee = asyncHandler(async (req, res) => {
  const employee = await Employee.findById(req.params.id);

  if (!employee) {
    res.status(404);
    throw new Error("Employee not found");
  }

  res.status(200).json({
    employee,
  });
});

// ---------------------- Edit Employee ----------------------
export const editEmployee = asyncHandler(async (req, res) => {
  const updates = {
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    designation: req.body.designation,
    salary: req.body.salary,
  };

  if (req.file) {
    updates.profileImage = buildImageUrl(req, req.file.filename);
  }

  const employee = await Employee.findByIdAndUpdate(req.params.id, updates, {
    new: true,
  });

  if (!employee) {
    res.status(404);
    throw new Error("Employee not found");
  }

  res.status(200).json({
    message: "Employee updated",
    employee,
  });
});

// ---------------------- Delete Employee ----------------------
export const deleteEmployee = asyncHandler(async (req, res) => {
  const employee = await Employee.findByIdAndDelete(req.params.id);

  if (!employee) {
    res.status(404);
    throw new Error("Employee not found");
  }

  res.status(200).json({
    message: "Employee deleted",
  });
});
