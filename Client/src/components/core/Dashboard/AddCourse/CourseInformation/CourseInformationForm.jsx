import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCourseCategories,
  editCourseDetails,
  addCourseDetails,
} from "../../../../../services/operations/courseOperations";
import ChipInput from "./ChipInput";
import UploadImage from "./UploadImage";
import RequirementField from "./RequirementField";
import {
  setCourse,
  setStep,
  setEditCourse,
  setAllCourses,
} from "../../../../../redux/slices/courseSlice";
import IconBtn from "../../../../common/IconBtn";
import { COURSE_STATUS } from "../../../../../utils/constants";
import { toast } from "react-hot-toast";
import Upload from "../Upload";
import { HiOutlineCurrencyRupee } from "react-icons/hi";
import { MdNavigateNext } from "react-icons/md";

// import { current } from '@reduxjs/toolkit'

const CourseInformationForm = ({ callFromEditCourse = false, editCourse }) => {
  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      tag: [],
      // thumbnail : {},
    },
  });

  const dispatch = useDispatch();

  const { course } = useSelector((state) => state.course);
  const { token } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);
  const [courseCategories, setCourseCategories] = useState([]);

  async function getCourseCategoriesDetails() {
    setLoading(true);

    try {
      const result = await fetchCourseCategories();
      if (courseCategories) {
        setCourseCategories(result);
      }
    } catch (e) {
      console.error(e);
    }

    setLoading(false);
  }

  useEffect(() => {
    if (editCourse) {
      setValue("courseDescription", course.courseDescription);
      setValue("tag", course.tag);
      setValue("price", course.price);
      setValue("courseName", course.courseName);
      setValue("whatYouWillLearn", course.whatYouWillLearn);
      setValue("category", course.category._id);
      setValue("instructions", course.instructions);
      setValue("thumbnail", course.thumbnail);
    }

    getCourseCategoriesDetails();
  }, [editCourse]);

  function isFormUpdated() {
    const currentValue = getValues();

    if (
      currentValue.courseName !== course.courseName ||
      currentValue.courseDescription !== course.courseDescription ||
      currentValue.price !== course.price ||
      currentValue.whatYouWillLearn !== course.whatYouWillLearn ||
      currentValue.category !== course.category._id ||
      currentValue.instructions.toString() !== course.instructions.toString() ||
      currentValue.thumbnail !== course.thumbnail ||
      currentValue.tag.toString() !== course.tag.toString()
    ) {
      return true;
    } else {

      return false;
    }
  }

  const submitForm = async (data) => {

    if (editCourse) {
      if (isFormUpdated()) {
        const currentValue = getValues();
        const formData = new FormData();


        formData.append("courseId", course._id);

        if (currentValue.courseName !== course.courseName) {
          formData.append("courseName", data.courseName);
        }

        if (currentValue.description !== course.courseDescription) {
          formData.append("courseDescription", data.courseDescription);
        }

        if (currentValue.price !== course.price) {
          formData.append("price", data.price);
        }

        if (currentValue.whatYouWillLearn !== course.whatYouWillLearn) {
          formData.append("whatYouWillLearn", data.whatYouWillLearn);
        }
        if (currentValue.category !== course.category._id) {
          formData.append("category", data.category._id);
        }
        if (currentValue.thumbnail[0] !== course.thumbnail) {
          formData.append("thumbnail", data.thumbnail);
        }
        if (currentValue.tag.toString() !== course.tag.toString()) {
          formData.append("tag", JSON.stringify(data.tag));
        }
        if (
          currentValue.instructions.toString() !==
          course.instructions.toString()
        ) {
          formData.append("instructions", JSON.stringify(data.instructions));
        }

        setLoading(true);

        try {
          const result = await editCourse(formData, token);
          if (result) {
            dispatch(setCourse(result.course));
            dispatch(setStep(2));
          }
        } catch (e) {
          console.error(e);
        }
        setLoading(false);
      } else {
        toast.error("No changes made so far");
      }

      return;
    }

    if (editCourse && !isFormUpdated()) {
      dispatch(setStep(2));
      return;
    }

    const formData = new FormData();
    // formData.append("courseId", course._id);
    console.log(data.thumbnail)
    formData.append("courseName", data.courseName);
    formData.append("courseDescription", data.courseDescription);
    formData.append("price", data.price);
    formData.append("whatYouWillLearn", data.whatYouWillLearn);
    formData.append("category", data.category);
    formData.append("thumbnail", data.thumbnail);
    formData.append("tag", data.tag);
    formData.append("instructions", data.instructions);
    formData.append("status", COURSE_STATUS.DRAFT);

    for (const [key, value] of formData.entries()) {
      console.log(key ," --> " , value)
    }

    try {
      setLoading(true);

      const result = await addCourseDetails(formData, token);
      if (result) {
        dispatch(setCourse(result));
        dispatch(setStep(2));
        // dispatch(setAllCourses(result.course))
      }
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(submitForm)}
        className="space-y-8 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-6"
      >
        {/* Course Title */}
        <div className="flex flex-col space-y-2">
          <label className="text-sm text-richblack-5" htmlFor="courseName">
            Course Title <sup className="text-pink-200">*</sup>
          </label>
          <input
            id="courseName"
            placeholder="Enter Course Title"
            {...register("courseName", { required: true })}
            className="form-style w-full"
          />
          {errors.courseName && (
            <span className="ml-2 text-xs tracking-wide text-pink-200">
              Course title is required
            </span>
          )}
        </div>
        {/* Course Short Description */}
        <div className="flex flex-col space-y-2">
          <label
            className="text-sm text-richblack-5"
            htmlFor="courseDescription"
          >
            Course Short Description <sup className="text-pink-200">*</sup>
          </label>
          <textarea
            id="courseDescription"
            placeholder="Enter Description"
            {...register("courseDescription", { required: true })}
            className="form-style resize-x-none min-h-[130px] w-full"
          />
          {errors.courseDescription && (
            <span className="ml-2 text-xs tracking-wide text-pink-200">
              Course Description is required
            </span>
          )}
        </div>
        {/* Course Price */}
        <div className="flex flex-col space-y-2">
          <label className="text-sm text-richblack-5" htmlFor="price">
            Course Price <sup className="text-pink-200">*</sup>
          </label>
          <div className="relative">
            <input
              id="price"
              placeholder="Enter Course Price"
              {...register("price", {
                required: true,
                valueAsNumber: true,
                pattern: {
                  value: /^(0|[1-9]\d*)(\.\d+)?$/,
                },
              })}
              className="form-style w-full !pl-12"
            />
            <HiOutlineCurrencyRupee className="absolute left-3 top-1/2 inline-block -translate-y-1/2 text-2xl text-richblack-400" />
          </div>
          {errors.price && (
            <span className="ml-2 text-xs tracking-wide text-pink-200">
              Course Price is required
            </span>
          )}
        </div>
        {/* Course Category */}
        <div className="flex flex-col space-y-2">
          <label className="text-sm text-richblack-5" htmlFor="courseCategory">
            Course Category <sup className="text-pink-200">*</sup>
          </label>
          <select
            {...register("category", { required: true })}
            defaultValue=""
            id="category"
            className="form-style w-full capitalize"
          >
            <option value="" disabled>
              Choose a Category
            </option>
            {!loading &&
              courseCategories?.map((category, indx) => (
                <option
                  key={indx}
                  value={category?._id}
                  className="capitalize "
                >
                  {category?.name}
                </option>
              ))}
          </select>
          {errors.courseCategory && (
            <span className="ml-2 text-xs tracking-wide text-pink-200">
              Course Category is required
            </span>
          )}
        </div>
        {/* Course Tags */}
        <ChipInput
          label="Tags"
          name="tag"
          placeholder="Enter Tags and press Enter"
          register={register}
          errors={errors}
          setValue={setValue}
          getValues={getValues}
          editCourse={editCourse}
        />

        {/* Course Thumbnail Image */}
        <Upload
          name="thumbnail"
          label="Course Thumbnail"
          register={register}
          setValue={setValue}
          errors={errors}
          editData={editCourse ? course?.thumbnail : null}
          getValues={getValues}
        />

        {/* <ChipInput
        label="Tags"
        name="tag"
        placeholder="Enter Tags and press Enter"
        register={register}
        errors={errors}
        setValue={setValue}
        getValues={getValues}
      /> */}

        {/* Benefits of the course */}
        <div className="flex flex-col space-y-2">
          <label
            className="text-sm text-richblack-5"
            htmlFor="whatYouWillLearn"
          >
            Benefits of the course <sup className="text-pink-200">*</sup>
          </label>
          <textarea
            id="whatYouWillLearn"
            placeholder="Enter benefits of the course"
            {...register("whatYouWillLearn", { required: true })}
            className="form-style resize-x-none min-h-[130px] w-full"
          />
          {errors.whatYouWillLearn && (
            <span className="ml-2 text-xs tracking-wide text-pink-200">
              Benefits of the course is required
            </span>
          )}
        </div>
        {/* Requirements/Instructions */}
        <RequirementField
          name="instructions"
          label="Requirements/Instructions"
          register={register}
          setValue={setValue}
          errors={errors}
          getValues={getValues}
          editCourse={editCourse}
          editData={course?.instructions}
        />
        {/* Next Button */}
        <div className="flex justify-end gap-x-2">
          {editCourse && (
            <button
              onClick={() => dispatch(setStep(2))}
              disabled={loading}
              className={`flex cursor-pointer items-center gap-x-2 rounded-md bg-richblack-300 py-[8px] px-[20px] font-semibold text-richblack-900`}
            >
              Continue Wihout Saving
            </button>
          )}
          <IconBtn
            disabled={loading}
            text={!editCourse ? "Next" : "Save Changes"}
          >
            <MdNavigateNext />
          </IconBtn>
        </div>
      </form>
    </>
  );
};


export default CourseInformationForm;
