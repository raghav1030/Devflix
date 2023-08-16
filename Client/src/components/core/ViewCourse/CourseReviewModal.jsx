import React, { useEffect } from 'react'
import {useSelector} from 'react-redux'
import {useForm} from 'react-hook-form'
import ReactStars from "react-rating-stars-component";
import IconBtn from '../../common/IconBtn'
import { createRating } from '../../../services/operations/courseOperations';



const CourseReviewModal = ({setReviewModal}) => {


  const {user} = useSelector(state => state.profile)
  const {token} = useSelector(state => state.auth)
  const {courseEntireData} = useSelector(state => state.viewCourse)
  const {
    setValue,
    getValues,
    register,
    formState:{errors},
    handleSubmit
  } = useForm()


  const ratingChanged = (newRatings) => {
    setValue("courseRating" , newRatings)

  }

  console.log("courseEntireData" , courseEntireData)

  const onSubmit = async(data) => {
    await createRating({
      courseId : courseEntireData._id,
      rating : data.courseRating,
      review : data.courseExperience 
    }, 
    token
    )

    setReviewModal(false)
  }


  useEffect(()=> {
    setValue('courseExperience' , "")
    setValue("courseRating" , 0)
  } , [])



  return (
    <div>
      <div>
        <div>
          
          <p>
            Add Review
          </p>

          <button
          onClick={() => setReviewModal(false)}>
            Cancel
          </button>

          <div>
            <img src={user?.image} alt="user image" className='aspect-square w-[50px] rounded-full object-cover  ' />
          </div>

          <div>
            <p>{user?.firstName} {user?.lastName}</p>
            <p>Posting Publicly</p>


          </div>

          <form action="submit" onSubmit={handleSubmit(onSubmit)} className='mt-6 flex flex-col items-center '
          >
            <ReactStars 
            count={5}
            onChange={ratingChanged}
            size={24}
            activeColor="#ffd700"
            ></ReactStars>


          <div>

            <label htmlFor="courseExperience">
              Add Your Experience
            </label>

            <textarea name="courseExperience" id="courseExperience" {...register('courseExperience' , {required : true})} className='form-style min-h-[130px] w-full ' cols="30" rows="10" ></textarea>

            {
              errors.courseExperience && 
              <div>
                Please Add your Experience
              </div>
            }

            </div>

            <div>
              <button type='button' onClick={() => setReviewModal(false)} >
                Cancel
              </button>

              <IconBtn 
              text={"Save"}
              type={"Submit"}
              ></IconBtn>
            </div>

          </form>

        </div>
      </div>
    </div>
  )
}

export default CourseReviewModal