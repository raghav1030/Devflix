// import React, { useCallback, useEffect, useState } from 'react'
// import { MdClose } from 'react-icons/md'
// import { useSelector } from 'react-redux'

// const ChipInput = ({register , setValue, name, label, placeholder, errors, watch, tagArray=null  }) => {

//     const [inputTags , setInputTags] = useState([])
//     const [tag , setTag] = useState('')

//     // const handleChange = useCallback((e) => {

//     //     const value = e.target.value.trim()

//     //     setTag(value)

//     //     // console.log(tag)

//     // },[ tag])

//     const handleKeyDown = (e) => {

//         const value = e.target.value.trim()
//         // console.log(e.target.value.trim())

//         if((e.key === 'Enter' || e.key === ',') && value !== ''){

//             setInputTags((prev) => [...prev, tag]);

//             // setValue(name, [...inputTags, tag]);

//         e.target.value = ''
//         console.log(watch(name))

//         }
//     }

//     const handleDeleteChip = ( name , index)=>{
//         console.log(name)
//         console.log(index)

//         setInputTags((prev) => {
//             const newArray = [...prev]
//             newArray.splice(index , 1 )
//             return newArray
//         })

//         // setValue(name, inputTags.filter((_,i) => i !== index).join(', ') );

//         console.log(watch(name))

//     }

//     useEffect(()=>{
//         register(name, {
//             required : true,
//             validate : (value) => value.length > 0
//         })
//     },[])

//     useEffect(()=>{
//         if(inputTags){
//             setValue(name, inputTags)
//         }

//         if(tagArray){
//             setInputTags(tagArray)
//         }
//         console.log('watch(tag) from useEffect' , watch(name))
//     } , [inputTags])

// return (
//     // <label >

//     //     <div className={`text-black bg-yellow-50 ${inputTags.length === 0 && "hidden" } `}   >
//     //         {
//     //             inputTags.map((item , index) => (

//     //                 <div className='flex ' key={index} >

//     //                     <div  >
//     //                         {item}

//     //                         <div onClick={() => removeTag(name,index)}>
//     //                             remove
//     //                         </div>

//     //                     </div>

//     //                 </div>
//     //             ))
//     //         }

//     //     </div>

//     //     <p>{label} <sup>*</sup> </p>

//     //     <input type="text"
//     //     placeholder={placeholder}
//     //     // {...register(name, {required : true})}
//     //     onKeyDown={handleKeyDown}
//     //     onChange={handleChange}
//     //     className='text-richblack-900 '
//     //     />
//     //     {
//     //         errors &&
//     //         <div>
//     //             This field is required
//     //         </div>
//     //     }
//     // </label>

//     <div className="flex flex-col space-y-2">
//     {/* Render the label for the input */}
//     <label className="text-sm text-richblack-5" htmlFor={name}>
//       {label} <sup className="text-pink-200">*</sup>
//     </label>
//     {/* Render the inputTags and input */}
//     <div className="flex w-full flex-wrap gap-y-2">
//       {/* Map over the inputTags array and render each chip */}
//       {inputTags.map((chip, index) => (
//         <div
//           key={index}
//           className="m-1 flex items-center rounded-full bg-yellow-400 px-2 py-1 text-sm text-richblack-5"
//         >
//           {/* Render the chip value */}
//           {chip}
//           {/* Render the button to delete the chip */}
//           <button
//             type="button"
//             className="ml-2 focus:outline-none"
//             onClick={() => handleDeleteChip(index)}
//           >
//             <MdClose className="text-sm" />
//           </button>
//         </div>
//       ))}
//       {/* Render the input for adding new inputTags */}
//       <input
//         id={name}
//         name={name}
//         type="text"
//         placeholder={placeholder}
//         onKeyDown={handleKeyDown}
//         className="form-style w-full"
//       />
//     </div>
//     {/* Render an error message if the input is required and not filled */}
//     {errors[name] && (
//       <span className="ml-2 text-xs tracking-wide text-pink-200">
//         {label} is required
//       </span>
//     )}
//   </div>

// )
// }

// // //   function ChipInput({
// // //     // Props to be passed to the component
// // //     label,
// // //     name,
// // //     placeholder,
// // //     register,
// // //     errors,
// // //     setValue,
// // //     getValues,
// // //   }) {
// // //     const { editCourse, course } = useSelector((state) => state.course)

// // //     // Setting up state for managing inputTags array
// // //     const [inputTags, setInputTags] = useState([])

// // //     useEffect(() => {
// // //       if (editCourse) {
// // //         // console.log(course)
// // //         setInputTags(course?.tag)
// // //       }
// // //       register(name, { required: true, validate: (value) => value.length > 0 })
// // //       // eslint-disable-next-line react-hooks/exhaustive-deps
// // //     }, [])

// // //     useEffect(() => {
// // //       setValue(name, inputTags)
// // //       // eslint-disable-next-line react-hooks/exhaustive-deps
// // //     }, [inputTags])

// // //     // Function to handle user input when inputTags are added
// // //     const handleKeyDown = (event) => {
// // //       // Check if user presses "Enter" or ","
// // //       if (event.key === "Enter" || event.key === ",") {
// // //         // Prevent the default behavior of the event
// // //         event.preventDefault()
// // //         // Get the input value and remove any leading/trailing spaces
// // //         const chipValue = event.target.value.trim()
// // //         // Check if the input value exists and is not already in the inputTags array
// // //         if (chipValue && !inputTags.includes(chipValue)) {
// // //           // Add the chip to the array and clear the input
// // //           const newinputTags = [...inputTags, chipValue]
// // //           setInputTags(newinputTags)
// // //           event.target.value = ""
// // //         }
// // //       }
// // //     }

// // //     // Function to handle deletion of a chip
// // //     const handleDeleteChip = (chipIndex) => {
// // //       // Filter the inputTags array to remove the chip with the given index
// // //       const newinputTags = inputTags.filter((_, index) => index !== chipIndex)
// // //       setInputTags(newinputTags)
// // //     }

// // //     // Render the component
// // //     return (
// // //         <div className="flex flex-col space-y-2">
// // //           {/* Render the label for the input */}
// // //           <label className="text-sm text-richblack-5" htmlFor={name}>
// // //             {label} <sup className="text-pink-200">*</sup>
// // //           </label>
// // //           {/* Render the inputTags and input */}
// // //           <div className="flex w-full flex-wrap gap-y-2">
// // //             {/* Map over the inputTags array and render each chip */}
// // //             {inputTags.map((chip, index) => (
// // //               <div
// // //                 key={index}
// // //                 className="m-1 flex items-center rounded-full bg-yellow-400 px-2 py-1 text-sm text-richblack-5"
// // //               >
// // //                 {/* Render the chip value */}
// // //                 {chip}
// // //                 {/* Render the button to delete the chip */}
// // //                 <button
// // //                   type="button"
// // //                   className="ml-2 focus:outline-none"
// // //                   onClick={() => handleDeleteChip(index)}
// // //                 >
// // //                   <MdClose className="text-sm" />
// // //                 </button>
// // //               </div>
// // //             ))}
// // //             {/* Render the input for adding new inputTags */}
// // //             <input
// // //               id={name}
// // //               name={name}
// // //               type="text"
// // //               placeholder={placeholder}
// // //               onKeyDown={handleKeyDown}
// // //               className="form-style w-full"
// // //             />
// // //           </div>
// // //           {/* Render an error message if the input is required and not filled */}
// // //           {errors[name] && (
// // //             <span className="ml-2 text-xs tracking-wide text-pink-200">
// // //               {label} is required
// // //             </span>
// // //           )}
// // //         </div>
// // //     )
// // //           }

// // export default ChipInput

// // Importing React hook for managing component state
// // import { useEffect, useState } from "react"
// // // Importing React icon component
// // import { MdClose } from "react-icons/md"
// // import { useSelector } from "react-redux"

// // Defining a functional component ChipInput
// // export default function ChipInput({
// //   // Props to be passed to the component
// //   label,
// //   name,
// //   placeholder,
// //   register,
// //   errors,
// //   setValue,
// //   getValues,
// // }) {
// //   const { editCourse, course } = useSelector((state) => state.course)

// //   // Setting up state for managing inputTags array
// //   const [inputTags, setInputTags] = useState([])

// //   useEffect(() => {
// //     if (editCourse) {
// //       // console.log(course)
// //       setInputTags(course?.tag)
// //     }
// //     register(name, { required: true, validate: (value) => value.length > 0 })
// //     // eslint-disable-next-line react-hooks/exhaustive-deps
// //   }, [])

// //   useEffect(() => {
// //     setValue(name, inputTags)
// //     // eslint-disable-next-line react-hooks/exhaustive-deps
// //   }, [inputTags])

// //   // Function to handle user input when inputTags are added
// //   const handleKeyDown = (event) => {
// //     // Check if user presses "Enter" or ","
// //     if (event.key === "Enter" || event.key === ",") {
// //       // Prevent the default behavior of the event
// //       event.preventDefault()
// //       // Get the input value and remove any leading/trailing spaces
// //       const chipValue = event.target.value.trim()
// //       // Check if the input value exists and is not already in the inputTags array
// //       if (chipValue && !inputTags.includes(chipValue)) {
// //         // Add the chip to the array and clear the input
// //         const newinputTags = [...inputTags, chipValue]
// //         setInputTags(newinputTags)
// //         event.target.value = ""
// //       }
// //     }
// //   }

// //   // Function to handle deletion of a chip
// //   const handleDeleteChip = (chipIndex) => {
// //     // Filter the inputTags array to remove the chip with the given index
// //     const newinputTags = inputTags.filter((_, index) => index !== chipIndex)
// //     setInputTags(newinputTags)
// //   }

// //   // Render the component
// //   return (
// //       <div className="flex flex-col space-y-2">
// //         {/* Render the label for the input */}
// //         <label className="text-sm text-richblack-5" htmlFor={name}>
// //           {label} <sup className="text-pink-200">*</sup>
// //         </label>
// //         {/* Render the inputTags and input */}
// //         <div className="flex w-full flex-wrap gap-y-2">
// //           {/* Map over the inputTags array and render each chip */}
// //           {inputTags.map((chip, index) => (
// //             <div
// //               key={index}
// //               className="m-1 flex items-center rounded-full bg-yellow-400 px-2 py-1 text-sm text-richblack-5"
// //             >
// //               {/* Render the chip value */}
// //               {chip}
// //               {/* Render the button to delete the chip */}
// //               <button
// //                 type="button"
// //                 className="ml-2 focus:outline-none"
// //                 onClick={() => handleDeleteChip(index)}
// //               >
// //                 <MdClose className="text-sm" />
// //               </button>
// //             </div>
// //           ))}
// //           {/* Render the input for adding new inputTags */}
// //           <input
// //             id={name}
// //             name={name}
// //             type="text"
// //             placeholder={placeholder}
// //             onKeyDown={handleKeyDown}
// //             className="form-style w-full"
// //           />
// //         </div>
// //         {/* Render an error message if the input is required and not filled */}
// //         {errors.name && (
// //           <span className="ml-2 text-xs tracking-wide text-pink-200">
// //             {label} is required
// //           </span>
// //         )}
// //       </div>
// //   )
// // }

// Importing React hook for managing component state
import { useEffect, useState } from "react";
// Importing React icon component
import { MdClose } from "react-icons/md";
import { useSelector } from "react-redux";

// Defining a functional component ChipInput
export default function ChipInput({
  // Props to be passed to the component
  label,
  name,
  placeholder,
  register,
  errors,
  setValue,
  getValues,
  editCourse,
}) {
  const { course } = useSelector((state) => state.course);

  // Setting up state for managing inputTags array
  const [inputTags, setInputTags] = useState(course?.tag ? course.tag : []);
  //   console.log(course?.tag)
  // console.log("editCourse" , editCourse , "course?.tag" , course?.tag)

  useEffect(() => {
    console.log("editCourse", editCourse, "course?.tag", course?.tag);
    if (editCourse) {
      // console.log(course)
      setInputTags(course?.tag);
      console.log(inputTags);
    }
    if (!editCourse) {
      setInputTags([]);
    }
    register(name, { required: true, validate: (value) => value.length > 0 });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setValue(name, inputTags);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputTags]);

  // Function to handle user input when inputTags are added
  const handleKeyDown = (event) => {
    // Check if user presses "Enter" or ","
    if (event.key === "Enter" || event.key === ",") {
      // Prevent the default behavior of the event
      event.preventDefault();
      // Get the input value and remove any leading/trailing spaces
      const chipValue = event.target.value.trim();
      // Check if the input value exists and is not already in the inputTags array
      if (chipValue && !inputTags.includes(chipValue)) {
        // Add the chip to the array and clear the input
        const newinputTags = [...inputTags, chipValue];
        setInputTags(newinputTags);
        event.target.value = "";
      }
    }
  };

  // Function to handle deletion of a chip
  const handleDeleteChip = (chipIndex) => {
    // Filter the inputTags array to remove the chip with the given index
    const newinputTags = inputTags.filter((_, index) => index !== chipIndex);
    setInputTags(newinputTags);
  };

  console.log(inputTags);

  // Render the component
  return (
    <div className="flex flex-col space-y-2">
      {/* Render the label for the input */}
      <label className="text-sm text-richblack-5" htmlFor={name}>
        {label} <sup className="text-pink-200">*</sup>
      </label>
      {/* Render the inputTags and input */}
      <div className="flex w-full flex-wrap gap-y-2">
        {/* Map over the inputTags array and render each chip */}
        {inputTags.map((chip, index) => (
          <div
            key={index}
            className="m-1 flex items-center rounded-full bg-yellow-400 px-2 py-1 text-sm text-richblack-5"
          >
            {/* Render the chip value */}
            {chip}
            {/* Render the button to delete the chip */}
            <button
              type="button"
              className="ml-2 focus:outline-none"
              onClick={() => handleDeleteChip(index)}
            >
              <MdClose className="text-sm" />
            </button>
          </div>
        ))}
        {/* Render the input for adding new inputTags */}
        <input
          id={name}
          name={name}
          type="text"
          placeholder={placeholder}
          onKeyDown={handleKeyDown}
          className="form-style w-full"
        />
      </div>
      {/* Render an error message if the input is required and not filled */}
      {errors[name] && (
        <span className="ml-2 text-xs tracking-wide text-pink-200">
          {label} is required
        </span>
      )}
    </div>
  );
}
