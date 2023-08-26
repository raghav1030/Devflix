import React, { useEffect } from "react";
import RenderSteps from "./RenderSteps";
import { useDispatch, useSelector } from "react-redux";
import PublishCourse from "./PublishCourse/PublishCourse";
import CourseBuilderForm from "./CourseBuilder/CourseBuilderForm";
import CourseInformationForm from "./CourseInformation/CourseInformationForm";
import {
  setCourse,
  setEditCourse,
  setStep,
} from "../../../../redux/slices/courseSlice";

const AddCourseIndex = ({ callFromEditCourse = false }) => {
  const { step, course, editCourse } = useSelector((state) => state.course);
  const dispatch = useDispatch();
  console.log(callFromEditCourse);

  useEffect(() => {
    if (!callFromEditCourse) {
      console.log("Inside !callfromEditCourse");
      dispatch(setEditCourse(false));
      dispatch(setCourse(null));
      dispatch(setStep(1));
      console.log(course, editCourse);
    }
    console.log(editCourse);
  }, []);
  // console.log(course, editCourse)

  return (
    // <div>
    //     <h1>Add Course</h1>

    //     <div>
    //         <RenderSteps></RenderSteps>
    //     </div>

    //     <div>
    //         {step === 1 && <CourseInformationForm editCourse={callFromEditCourse ? true : false} />}
    //         {step === 2 && <CourseBuilderForm/>}
    //         {step === 3 && <PublishCourse/>}
    //     </div>

    // </div>

    <>
      <div className="flex w-full items-start gap-x-6">
        <div className="flex flex-1 flex-col">
          <h1 className="mb-14 text-3xl font-medium text-richblack-5">
            {editCourse ? "Edit Course" : "Add Course"}
          </h1>
          <div className="flex-1">
            <RenderSteps />
          </div>

          <div>
            {step === 1 && (
              <CourseInformationForm
                editCourse={callFromEditCourse ? true : false}
              />
            )}
            {step === 2 && <CourseBuilderForm />}
            {step === 3 && <PublishCourse />}
          </div>
        </div>
        {/* Course Upload Tips */}
        <div className="sticky top-10 hidden max-w-[400px] flex-1 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-6 xl:block">
          <p className="mb-8 text-lg text-richblack-5">⚡ Course Upload Tips</p>
          <ul className="ml-5 list-item list-disc space-y-4 text-xs text-richblack-5">
            <li>Set the Course Price option or make it free.</li>
            <li>Standard size for the course thumbnail is 1024x576.</li>
            <li>Video section controls the course overview video.</li>
            <li>Course Builder is where you create & organize a course.</li>
            <li>
              Add Topics in the Course Builder section to create lessons,
              quizzes, and assignments.
            </li>
            <li>
              Information from the Additional Data section shows up on the
              course single page.
            </li>
            <li>Make Announcements to notify any important</li>
            <li>Notes to all enrolled students at once.</li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default AddCourseIndex;
