import React, { useEffect, useState } from "react";
import { Outlet, useLocation, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getFullDetailsOfCourse } from "../services/operations/courseOperations";
// import { setCompletedLectures, setCourseSectionData, setEntireCourseData, setTotalNoOfLectures, updateCompletedLectures } from '../redux/slices/viewCourseSlice'
import {
  setCompletedLectures,
  setCourseSectionData,
  setEntireCourseData,
  setTotalNoOfLectures,
  updateCompletedLectures,
} from "../redux/slices/viewCourseSlice";
import CourseReviewModal from "../components/core/ViewCourse/CourseReviewModal";
import VideoDetailsSidebar from "../components/core/ViewCourse/VideoDetailsSidebar";

const ViewCourse = () => {
  const [reviewModal, setReviewModal] = useState(null);

  const { courseId, subSectionId } = useParams();

  const { token } = useSelector((state) => state.auth);

  const location = useLocation();

  const dispatch = useDispatch();

  const { courseSectionData, courseEntireData, completedLectures } =
    useSelector((state) => state.viewCourse);
  // const [courseData, setCourseData] = useState(null)

  const setCourseSpecificDetails = async () => {
    const courseData = await getFullDetailsOfCourse(
      courseId,
      subSectionId,
      token
    );
    console.log("courseData", courseData);
    // setCourseData(courseData)
    dispatch(setCourseSectionData(courseData?.courseDetails?.courseContent));
    dispatch(setEntireCourseData(courseData?.courseDetails));
    dispatch(setCompletedLectures(courseData?.completedVideos));

    console.log(
      "courseSectionData, courseEntireData , completedLectures",
      courseSectionData,
      courseEntireData,
      completedLectures
    );
    console.log("courseData?.completedVideos", courseData?.completedVideos);
    console.log(
      "courseData?.courseDetails?.courseContent",
      courseData?.courseDetails?.courseContent[0]
    );
    console.log("courseData?.courseDetails", courseData?.courseDetails);

    let lectures = 0;

    courseData?.courseDetails?.courseContent?.forEach((sec) => {
      lectures += sec.subSection.length;
    });

    dispatch(setTotalNoOfLectures(lectures));
  };

  useEffect(() => {
    console.log("Render 1");
    setCourseSpecificDetails();
  }, []);

  return (
    <>
      <div className="relative flex min-h-[calc(100vh-3.5rem)]">
        <VideoDetailsSidebar setReviewModal={setReviewModal} />
        <div className="h-[calc(100vh-3.5rem)] flex-1 overflow-auto">
          <div className="mx-6">
            <Outlet />
          </div>
        </div>
      </div>
      {reviewModal && <CourseReviewModal setReviewModal={setReviewModal} />}
    </>
  );
};

export default ViewCourse;
