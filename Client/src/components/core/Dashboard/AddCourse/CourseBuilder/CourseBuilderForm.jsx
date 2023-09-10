import React, { useState } from "react";
import { set, useForm } from "react-hook-form";
import IconBtn from "../../../../common/IconBtn";
import { BiAddToQueue } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { BiArrowToRight } from "react-icons/bi";
import NestedView from "./NestedView";
import {
  setStep,
  setEditCourse,
  setCourse,
} from "../../../../../redux/slices/courseSlice";
import { toast } from "react-hot-toast";
import {
  updateSection,
  createSection,
} from "../../../../../services/operations/courseOperations";
import { MdNavigateNext } from "react-icons/md";
import { IoAddCircleOutline } from "react-icons/io5";

const CourseBuilderForm = () => {
  const {
    register,
    setValue,
    getValues,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const dispatch = useDispatch();

  const [editSectionName, setEditSectionName] = useState(false);
  const { course } = useSelector((state) => state.course);
  const [loading, setLoading] = useState(false);
  const { token } = useSelector((state) => state.auth);


  function cancelEditSectionName() {
    setEditSectionName(false);
    setValue("sectionName", "");
  }

  console.log(course)

  function goBack() {
    dispatch(setStep(1));
    dispatch(setEditCourse(true));
  }

  function goToNext() {
    if (course.courseContent.length === 0) {
      toast.error("Please Add Atleast one Section");
      return;
    }

    for (const i in course.courseContent) {
      if (course.courseContent[i].subSection.length === 0) {
        toast.error(
          `Please Enter Atleast One Sub Section in Section ${parseInt(i + 1)}`
        );
        return;
      }
    }


    dispatch(setStep(3));
  }

  async function onSubmit(data) {
    setLoading(true);

    let result = null;

    if (editSectionName) {
      try {
        result = await updateSection(
          {
            sectionId: editSectionName,
            sectionName: data.sectionName,
            courseId: course._id,
          },
          token
        );

      } catch (e) {
        console.error(e);
      }
    } else {
      try {
        result = await createSection(
          {
            sectionName: data.sectionName,
            courseId: course._id,
          },
          token
        );
      } catch (e) {
        console.error(e);
      }
    }

    if (result) {
      dispatch(setCourse(result));
      setEditSectionName(null);
      setValue("sectionName", "");
    }

    setLoading(false);
  }

  function handleChangeEditSectionName(sectionId, sectionName) {
    if (editSectionName === sectionId) {
      cancelEditSectionName();
      return;
    }

    setEditSectionName(sectionId);
    setValue("sectionName", sectionName);
  }

  console.log(course.courseContent    )
  return (
    

    <div className="space-y-8 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-6">
      <p className="text-2xl font-semibold text-richblack-5">Course Builder</p>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="flex flex-col space-y-2">
          <label className="text-sm text-richblack-5" htmlFor="sectionName">
            Section Name <sup className="text-pink-200">*</sup>
          </label>
          <input
            id="sectionName"
            disabled={loading}
            placeholder="Add a section to build your course"
            {...register("sectionName", { required: true })}
            className="form-style w-full"
          />
          {errors.sectionName && (
            <span className="ml-2 text-xs tracking-wide text-pink-200">
              Section name is required
            </span>
          )}
        </div>
        <div className="flex items-end gap-x-4">
          <IconBtn
            type="submit"
            disabled={loading}
            text={editSectionName ? "Edit Section Name" : "Create Section"}
            outline={true}
          >
            <IoAddCircleOutline size={20} className="text-yellow-50" />
          </IconBtn>
          {editSectionName && (
            <button
              type="button"
              onClick={cancelEditSectionName}
              className="text-sm text-richblack-300 underline"
            >
              Cancel Edit
            </button>
          )}
        </div>
      </form>
      {course.courseContent.length > 0 && (
        <NestedView handleChangeEditSectionName={handleChangeEditSectionName} />
      )}
      {/* Next Prev Button */}
      <div className="flex justify-end gap-x-3">
        <button
          onClick={goBack}
          className={`flex cursor-pointer items-center gap-x-2 rounded-md bg-richblack-300 py-[8px] px-[20px] font-semibold text-richblack-900`}
        >
          Back
        </button>
        <IconBtn disabled={loading} text="Next" onClick={goToNext}>
          <MdNavigateNext />
        </IconBtn>
      </div>
    </div>
  );
};

export default CourseBuilderForm;
