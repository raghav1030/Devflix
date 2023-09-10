import React, { useEffect, useState } from "react";

const RequirementField = ({
  register,
  setValue,
  name,
  label,
  placeholder,
  errors,
  editData,
  editCourse,
  getValues,
}) => {
  const [requirement, setRequirement] = useState("");
  const [requirementList, setRequirementList] = useState(
    editCourse ? editData : []
  );

  const addRequirement = (e) => {
    if (requirement.trim() !== "") {

      setRequirementList([...requirementList, requirement]);
      // setRequirement('')
      setRequirement("");
    }
  };

  const handleKeyDown = (event) => {
    event.preventDefault();

    if (event.key === "Enter" && requirement.trim() !== "") {
      addRequirement();
    }
  };

  const removeRequirement = (index) => {
    let newArray = [...requirementList];

    newArray.splice(index, 1);

    setRequirementList(newArray);
  };

  useEffect(() => {
    register(name, {
      required: true,
      validate: (value) => value.length > 0,
    });
  }, []);

  useEffect(() => {

    setValue(name, requirementList);
    console.log(requirementList)
    if (editCourse) {
      setRequirementList(editData);
    }
  }, [requirementList]);

  return (
    <div className="flex flex-col space-y-2">
      <label className="text-sm text-richblack-5" htmlFor={name}>
        {label} <sup className="text-pink-200">*</sup>
      </label>
      <div className="flex flex-col items-start space-y-2">
        <input
          type="text"
          id={name}
          value={requirement}
          onChange={(e) => setRequirement(e.target.value)}
          className="form-style w-full"
        />
        <button
          type="button"
          onClick={addRequirement}
          onKeyDown={handleKeyDown}
          className="font-semibold text-yellow-50"
        >
          Add
        </button>
      </div>
      {requirementList.length > 0 && (
        <ul className="mt-2 list-inside list-disc">
          {requirementList.map((requirement, index) => (
            <li key={index} className="flex items-center text-richblack-5">
              <span>{requirement}</span>
              <button
                type="button"
                className="ml-2 text-xs text-pure-greys-300 "
                onClick={() => removeRequirement(index)}
              >
                clear
              </button>
            </li>
          ))}
        </ul>
      )}
      {errors[name] && (
        <span className="ml-2 text-xs tracking-wide text-pink-200">
          {label} is required
        </span>
      )}
    </div>
  );
};

export default RequirementField;
