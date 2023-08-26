// Import the required modules
const express = require("express");
const router = express.Router();

// Import the Controllers

// Course Controllers Import
const {
  createCourse,
  getAllCourses,
  getCourseDetails,
  updateCourseDetails,
  getPublishedAllCourses,
  deleteCourse,
  editCourse,
  getInstructorCourses,
  getFullCourseDetails,
} = require("../controllers/Course");

// Categories Controllers Import
const {
  showAllCategories,
  createCategory,
  categoryPageDetails,
} = require("../controllers/Category");

// Sections Controllers Import
const {
  createSection,
  updateSection,
  deleteSection,
} = require("../controllers/Section");

// Sub-Sections Controllers Import
const {
  createSubSection,
  updateSubSection,
  deleteSubSection,
} = require("../controllers/SubSection");

// Rating Controllers Import
const {
  createRating,
  getAverageRating,
  getAllRating,
} = require("../controllers/RatingAndReview");

const { updateCourseProgress } = require("../controllers/CourseProgress");

// Importing Middlewares
const {
  auth,
  isInstructor,
  isStudent,
  isAdmin,
} = require("../middlewares/auth");

// ********************************************************************************************************
//                                      Course routes
// ********************************************************************************************************

// Courses can Only be Created by Instructors
router.post("/createCourse", auth, isInstructor, createCourse);
//Update the details of the course
router.put("/updateCourseDetails", auth, isInstructor, updateCourseDetails);
//Add a Section to a Course
router.post("/addSection", auth, isInstructor, createSection);
// Update a Section
router.put("/updateSection", auth, isInstructor, updateSection);
// Delete a Section
router.delete("/deleteSection", auth, isInstructor, deleteSection);
// Edit Sub Section
router.put("/updateSubSection", auth, isInstructor, updateSubSection);
// Delete Sub Section
router.delete("/deleteSubSection", auth, isInstructor, deleteSubSection);
// Add a Sub Section to a Section
router.post("/addSubSection", auth, isInstructor, createSubSection);
// Get all Registered Courses
router.get("/getAllCourses", getAllCourses);
// Get Details for a Specific Courses
router.post("/getCourseDetails", getCourseDetails);
// Get all the published courses
router.get("/getPublishedCourses", getPublishedAllCourses);
// Delete courses
router.delete("/deleteCourse", auth, isInstructor, deleteCourse);
// Edit Course
router.put("/editCourse", auth, isInstructor, editCourse);
// get Instructor Courses
router.get("/getInstructorCourses", auth, getInstructorCourses);
// get Course Details Authenticated
router.post("/getFullCourseDetails", auth, getFullCourseDetails);

router.post("/updateCourseProgress", auth, isStudent, updateCourseProgress);

// ********************************************************************************************************
//                                      Category routes (Only by Admin)
// ********************************************************************************************************
// Category can Only be Created by Admin
// TODO: Put IsAdmin Middleware here
router.post("/createCategory", auth, isAdmin, createCategory);
router.get("/showAllCategories", showAllCategories);
router.post("/getCategoryPageDetails", categoryPageDetails);

// ********************************************************************************************************
//                                      Rating and Review
// ********************************************************************************************************
router.post("/createRating", auth, isStudent, createRating);
router.get("/getAverageRating", getAverageRating);
router.get("/getReviews", getAllRating);

module.exports = router;
