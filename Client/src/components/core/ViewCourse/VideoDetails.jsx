import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {useLocation, useNavigate, useParams} from 'react-router-dom'
import { updateCompletedLectures } from '../../../redux/slices/viewCourseSlice'
import { Player } from 'video-react'
import { AiFillPlayCircle } from 'react-icons/ai'
import IconBtn from '../../common/IconBtn'
import { markLectureAsComplete } from '../../../services/operations/courseOperations'

const VideoDetails = () => {

  const {courseId , sectionId, subSectionId} = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const playRef = useRef()
  const {token} = useSelector(state => state.auth)
  const {courseSectionData, courseEntireData , completedLectures} = useSelector(state => state.viewCourse)
  const [videoData , setVideoData] = useState([])
  const [videoEnded, setVideoEnded] = useState(false)
  const [loading , setLoading] = useState(false)
  const location = useLocation()

  console.log("courseSectionData, courseEntireData , completedLectures" , courseSectionData, courseEntireData , completedLectures)

  const setVideoSpecificDetails = () =>{
    if(!courseSectionData.length) return

    if(!courseId || !sectionId || !subSectionId){
      navigate('/dashboard/enrolled-courses')
    }

    else{
      const filterSection = courseSectionData?.filter(section => section._id === sectionId)

      const filterVideo = filterSection?.[0]?.subSection?.filter((subSection) => subSection._id === subSectionId )
      
      setVideoData(filterVideo[0])
      setVideoEnded(false)
    }


  }

  useEffect(() => {
    console.log("render 3")
    console.log("completedLectures" , completedLectures)
    setVideoSpecificDetails()
  } , [courseSectionData, courseEntireData, location.pathname ])


  const isFirstVideo = () => {
    const currentSectionIndex = courseSectionData.findIndex((data) => data._id === sectionId)
    const currentSubSectionIndex = courseSectionData?.[currentSectionIndex]?.subSection?.findIndex(data => data._id === subSectionId)

    if(currentSectionIndex === 0 && currentSubSectionIndex === 0){
      console.log("First video true")
      return true
    }
    else{
      console.log("First video false")

      return false
    }
  }

  const isLastVideo = () => {

    const currentSectionIndex = courseSectionData.findIndex((data) => data._id === sectionId)

    const noOfSubSections = courseSectionData?.[currentSectionIndex]?.subSection?.length
    const currentSubSectionIndex = courseSectionData?.[currentSectionIndex]?.subSection?.findIndex(data => data._id === subSectionId)

    if(currentSectionIndex === courseSectionData?.length - 1 && currentSubSectionIndex === noOfSubSections - 1){
      return true
    }
    else{
      return false
    }


  }

  const goToNextVideo = () => {

    
    const currentSectionIndex = courseSectionData?.findIndex((data) => data._id === sectionId)
    const noOfSubSections = courseSectionData?.[currentSectionIndex]?.subSection?.length
    const currentSubSectionIndex = courseSectionData?.[currentSectionIndex]?.subSection?.findIndex(data => data._id === subSectionId)

    console.log("currentSectionIndex" , currentSectionIndex , "currentSubSectionIndex" , currentSubSectionIndex )
    if(currentSubSectionIndex === noOfSubSections - 1){
      const newSectionIndex = currentSectionIndex + 1
      const newSectionId = courseSectionData?.[newSectionIndex]?._id

      const newSubSectionIndex = 0
      const newSubSectionId = courseSectionData?.[newSectionIndex]?.subSection?.[newSubSectionIndex]._id
      console.log("newSectionId" , newSectionIndex , "newSubSectionIndex" , newSubSectionIndex )

      navigate(`/view-course/${courseId}/section/${newSectionId}/sub-section/${newSubSectionId}`)
    }
    else{
      const newSubSectionId = courseSectionData?.[currentSectionIndex]?.subSection?.[currentSubSectionIndex+1]._id
      console.log( "newSubSectionIndex" , newSubSectionId )

      navigate(`/view-course/${courseId}/section/${sectionId}/sub-section/${newSubSectionId}`)

    }


  }

  const goToPrevVideo = () => {

    const currentSectionIndex = courseSectionData.findIndex((data) => data._id === sectionId)
    const currentSubSectionIndex = courseSectionData?.[currentSectionIndex]?.subSection.findIndex(data => data._id === subSectionId)

    if(currentSubSectionIndex === 0){
      const newSectionIndex = currentSectionIndex - 1
      console.log(courseSectionData[newSectionIndex])
      const newSectionId = courseSectionData?.[newSectionIndex]._id

      const noOfSubSectionsOfPrevSection = courseSectionData?.[currentSectionIndex - 1]?.subSection.length
      const newSubSectionIndex = noOfSubSectionsOfPrevSection - 1
      const newSubSectionId = courseSectionData?.[newSectionIndex]?.subSection?.[newSubSectionIndex]._id

      navigate(`/view-course/${courseId}/section/${newSectionId}/sub-section/${newSubSectionId}`)
    }
    else{
      const newSubSectionId = courseSectionData?.[currentSectionIndex]?.subSection?.[currentSubSectionIndex-1]._id
      navigate(`/view-course/${courseId}/section/${sectionId}/sub-section/${newSubSectionId}`)

    }

  }

  const markAsCompleted = async  () => {
    setLoading(true)

    const result = await markLectureAsComplete({courseId : courseId, subSectionId : subSectionId} , token)
    console.log("result of mark as completed" ,result)
    if(result)
    dispatch(updateCompletedLectures(subSectionId))

    setLoading(false)
  }



  
  
  

  return (
    <div>
      {

        !videoData ? 
        <div>
          No Data Found
        </div>
        :
        <div>
          <Player
          ref={playRef}
          aspectRatio='16:9'
          playsInline
          onEnded={() => setVideoEnded(true)}
          src={videoData?.videoUrl}
          >
            <AiFillPlayCircle/>

            {
              videoEnded && 
              <div className='flex gap-5'>
                {
                  !completedLectures.includes(subSectionId) && 
                  <IconBtn
                  onClick={() => markAsCompleted()}
                  text={!loading ? "Mark As Completed" : "Loading..."}
                  />
                }

                <IconBtn
                disabled={loading}
                onClick={() => {
                  if(playRef?.current){
                    playRef?.current?.seek(0)
                    setVideoEnded(false)
                  }
                }}

                text={"Rewatch"}
                customClassName={"text-xl"}
                ></IconBtn>


                <div className='flex'>
                  {
                    !isFirstVideo() && (
                      <button
                      disabled={loading}
                      onClick={goToPrevVideo}
                      className='blackButton'

                      >
                      Previous  
                      </button>
                    )
                  }

                  {
                    !isLastVideo() && (
                      <button
                      disabled={loading}
                      onClick={goToNextVideo}
                      className='blackButton'

                      >
                      Next  
                      </button>
                    )
                  }

                </div>
              </div>
            }

            


          </Player>

        </div>
}

    <h1>
      {videoData?.title}
    </h1>

    <p>
      {videoData?.description}
    </p>
      
    </div>
  )
}

export default VideoDetails