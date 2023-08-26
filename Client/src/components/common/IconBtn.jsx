import React from "react";

const IconBtn = ({
  text,
  onClick,
  children,
  disabled,
  outline = false,
  customClassName,
  type,
}) => {
  return (
    <button
      onClick={onClick}
      className={`${customClassName} ${
        outline ? "border border-yellow-50 bg-transparent" : "bg-yellow-50"
      } flex  cursor-pointer gap-x-2 rounded-md py-2 px-3 font-semibold text-richblack-900   `}
      disabled={disabled}
      type={type}
    >
      {children ? (
        <span
          className={`${
            outline && "text-yellow-50 "
          } flex items-center justify-center  gap-2 `}
        >
          {" "}
          {text} {children}
        </span>
      ) : (
        text
      )}
    </button>
  );
};

export default IconBtn;
