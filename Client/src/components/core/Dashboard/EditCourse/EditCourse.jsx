import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getFullDetailsOfCourse } from "../../../../services/operations/courseOperations";
import { setCourse, setEditCourse } from "../../../../redux/slices/courseSlice";
import RenderSteps from "../AddCourse/RenderSteps";
import AddCourseIndex from "../AddCourse/AddCourseIndex";

const EditCourse = () => {
  const dispatch = useDispatch();
  const { courseId } = useParams();
  const { token } = useSelector((state) => state.auth);
  const { course } = useSelector((state) => state.course);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const populateCourseDetails = async () => {
      setLoading(true);

      const result = await getFullDetailsOfCourse(courseId, token);
      console.log("result", result);

      if (result) {
        dispatch(setCourse(result.courseDetails));
        dispatch(setEditCourse(true));
      }

      setLoading(false);
    };

    if (!course) {
      populateCourseDetails();
    }
  }, [courseId, token]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div>
        {course ? (
          <AddCourseIndex callFromEditCourse={true} />
        ) : (
          <p> Course Not Found </p>
        )}
      </div>
    </div>
  );
};

export default EditCourse;
