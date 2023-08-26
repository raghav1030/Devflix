import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchInstructorCourses } from "../../../../services/operations/courseOperations";
import IconBtn from "../../../common/IconBtn";
import CoursesTable from "./CoursesTable";
import { VscAdd } from "react-icons/vsc";
import { setStep } from "../../../../redux/slices/courseSlice";

const MyCourses = () => {
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const fetchCourses = async () => {
    setLoading(true);
    try {
      const result = await fetchInstructorCourses(token);
      console.log(result);
      if (result) {
        setCourses(result);
      }
      console.log("Control Reached till end of api call");
    } catch (e) {
      console.error(e);
    }

    setLoading(false);
  };

  // useEffect(()=>{
  // },[])

  useEffect(() => {
    fetchCourses();
    dispatch(setStep(1));
    console.log("Hello fromMy course");
  }, []);

  return (
    <div>
      <div className="mb-14 flex items-center justify-between">
        <h1 className="text-3xl font-medium text-richblack-5">My Courses</h1>
        <IconBtn
          text="Add Course"
          onClick={() => navigate("/dashboard/add-course")}
        >
          <VscAdd />
        </IconBtn>
      </div>
      {courses && <CoursesTable courses={courses} setCourses={setCourses} />}
    </div>
  );
};

export default MyCourses;
