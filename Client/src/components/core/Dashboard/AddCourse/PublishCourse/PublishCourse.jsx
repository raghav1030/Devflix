import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import IconBtn from "../../../../common/IconBtn";
import {
  resetCourseState,
  setStep,
} from "../../../../../redux/slices/courseSlice";
import { COURSE_STATUS } from "../../../../../utils/constants";
import { editCourseDetails } from "../../../../../services/operations/courseOperations";
import { useNavigate } from "react-router-dom";

const PublishCourse = () => {
  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    formState: { errors },
  } = useForm();
  const { token } = useSelector((state) => state.auth);
  const { course } = useSelector((state) => state.course);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();


  useEffect(() => {
    if (course?.status[0] === COURSE_STATUS.PUBLISHED) {
      setValue("public", true);
    }

  }, []);

  async function onSubmit(data) {
    handleCoursePublish();
  }

  function goToCourses() {
    dispatch(resetCourseState());
    // navigate to MyCourses
    navigate("/dashboard/my-courses");
  }

  async function handleCoursePublish() {
    if (
      (course?.status[0] === COURSE_STATUS.PUBLISHED &&
        getValues("public") === true) ||
      (course?.status[0] === COURSE_STATUS.PUBLISHED &&
        getValues("public") === true)
    ) {
      goToCourses();
      return;
    }

    const formData = new FormData();
    formData.append("courseId", course._id);

    const courseStatus =
      getValues("public") === true
        ? COURSE_STATUS.PUBLISHED
        : COURSE_STATUS.DRAFT;
    formData.append("status", courseStatus);

    setLoading(true);
    const result = await editCourseDetails(formData, token);

    if (result) {
      goToCourses();
      setLoading(false);
    }
  }

  function goBack() {
    dispatch(setStep(2));
  }

  return (
    <div className="rounded-md border-[1px] bg-richblack-800 p-6  border-richblack-700 flex flex-col gap-6 mt-6 ">
      <p>Publish Course</p>

      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Checkbox */}
        <div className="my-6 mb-8">
          <label htmlFor="public" className="inline-flex items-center text-lg">
            <input
              type="checkbox"
              id="public"
              {...register("public")}
              className="border-gray-300 h-4 w-4 rounded bg-richblack-500 text-richblack-400 focus:ring-2 focus:ring-richblack-5"
            />
            <span className="ml-2 text-richblack-400">
              Make this course as public
            </span>
          </label>
        </div>

        {/* Next Prev Button */}
        <div className="ml-auto flex max-w-max items-center gap-x-4">
          <button
            disabled={loading}
            type="button"
            onClick={goBack}
            className="flex cursor-pointer items-center gap-x-2 rounded-md bg-richblack-300 py-[8px] px-[20px] font-semibold text-richblack-900"
          >
            Back
          </button>
          <IconBtn disabled={loading} text="Save Changes" />
        </div>
      </form>
    </div>
  );
};

export default PublishCourse;


