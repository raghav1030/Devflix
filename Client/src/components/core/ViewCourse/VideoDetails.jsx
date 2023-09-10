import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { updateCompletedLectures } from "../../../redux/slices/viewCourseSlice";
import { BigPlayButton, Player } from "video-react";
import { AiFillPlayCircle } from "react-icons/ai";
import IconBtn from "../../common/IconBtn";
import { markLectureAsComplete } from "../../../services/operations/courseOperations";

const VideoDetails = () => {
  const { courseId, sectionId, subSectionId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const playerRef = useRef();
  const { token } = useSelector((state) => state.auth);
  const { courseSectionData, courseEntireData, completedLectures } =
    useSelector((state) => state.viewCourse);
  const [videoData, setVideoData] = useState([]);
  const [videoEnded, setVideoEnded] = useState(false);
  const [previewSource, setPreviewSource] = useState(null);
  const [loading, setLoading] = useState(false);
  const location = useLocation();


  const setVideoSpecificDetails = () => {
    if (!courseSectionData.length) return;

    if (!courseId || !sectionId || !subSectionId) {
      navigate("/dashboard/enrolled-courses");
    } else {
      const filterSection = courseSectionData?.filter(
        (section) => section._id === sectionId
      );

      const filterVideo = filterSection?.[0]?.subSection?.filter(
        (subSection) => subSection._id === subSectionId
      );

      setVideoData(filterVideo[0]);
      setPreviewSource(courseEntireData.thumbnail);
      setVideoEnded(false);
    }
  };

  useEffect(() => {
    setVideoSpecificDetails();
  }, [courseSectionData, courseEntireData, location.pathname]);

  const isFirstVideo = () => {
    const currentSectionIndex = courseSectionData.findIndex(
      (data) => data._id === sectionId
    );
    const currentSubSectionIndex = courseSectionData?.[
      currentSectionIndex
    ]?.subSection?.findIndex((data) => data._id === subSectionId);

    if (currentSectionIndex === 0 && currentSubSectionIndex === 0) {
      return true;
    } else {

      return false;
    }
  };

  const isLastVideo = () => {
    const currentSectionIndex = courseSectionData.findIndex(
      (data) => data._id === sectionId
    );

    const noOfSubSections =
      courseSectionData?.[currentSectionIndex]?.subSection?.length;
    const currentSubSectionIndex = courseSectionData?.[
      currentSectionIndex
    ]?.subSection?.findIndex((data) => data._id === subSectionId);

    if (
      currentSectionIndex === courseSectionData?.length - 1 &&
      currentSubSectionIndex === noOfSubSections - 1
    ) {
      return true;
    } else {
      return false;
    }
  };

  const goToNextVideo = () => {
    const currentSectionIndex = courseSectionData?.findIndex(
      (data) => data._id === sectionId
    );
    const noOfSubSections =
      courseSectionData?.[currentSectionIndex]?.subSection?.length;
    const currentSubSectionIndex = courseSectionData?.[
      currentSectionIndex
    ]?.subSection?.findIndex((data) => data._id === subSectionId);

    if (currentSubSectionIndex === noOfSubSections - 1) {
      const newSectionIndex = currentSectionIndex + 1;
      const newSectionId = courseSectionData?.[newSectionIndex]?._id;

      const newSubSectionIndex = 0;
      const newSubSectionId =
        courseSectionData?.[newSectionIndex]?.subSection?.[newSubSectionIndex]
          ._id;

      navigate(
        `/view-course/${courseId}/section/${newSectionId}/sub-section/${newSubSectionId}`
      );
    } else {
      const newSubSectionId =
        courseSectionData?.[currentSectionIndex]?.subSection?.[
          currentSubSectionIndex + 1
        ]._id;

      navigate(
        `/view-course/${courseId}/section/${sectionId}/sub-section/${newSubSectionId}`
      );
    }
  };

  const goToPrevVideo = () => {
    const currentSectionIndex = courseSectionData.findIndex(
      (data) => data._id === sectionId
    );
    const currentSubSectionIndex = courseSectionData?.[
      currentSectionIndex
    ]?.subSection.findIndex((data) => data._id === subSectionId);

    if (currentSubSectionIndex === 0) {
      const newSectionIndex = currentSectionIndex - 1;
      const newSectionId = courseSectionData?.[newSectionIndex]._id;

      const noOfSubSectionsOfPrevSection =
        courseSectionData?.[currentSectionIndex - 1]?.subSection.length;
      const newSubSectionIndex = noOfSubSectionsOfPrevSection - 1;
      const newSubSectionId =
        courseSectionData?.[newSectionIndex]?.subSection?.[newSubSectionIndex]
          ._id;

      navigate(
        `/view-course/${courseId}/section/${newSectionId}/sub-section/${newSubSectionId}`
      );
    } else {
      const newSubSectionId =
        courseSectionData?.[currentSectionIndex]?.subSection?.[
          currentSubSectionIndex - 1
        ]._id;
      navigate(
        `/view-course/${courseId}/section/${sectionId}/sub-section/${newSubSectionId}`
      );
    }
  };

  const markAsCompleted = async () => {
    setLoading(true);

    const result = await markLectureAsComplete(
      { courseId: courseId, subSectionId: subSectionId },
      token
    );
    if (result) dispatch(updateCompletedLectures(subSectionId));

    setLoading(false);
  };

  return (
    //     <div>
    //       {

    //         !videoData ?
    //         <div>
    //           No Data Found
    //         </div>
    //         :
    //         <div>
    //           <Player
    //           ref={playRef}
    //           aspectRatio='16:9'
    //           playsInline
    //           onEnded={() => setVideoEnded(true)}
    //           src={videoData?.videoUrl}
    //           >
    //             <AiFillPlayCircle/>

    //             {
    //               videoEnded &&
    //               <div className='flex gap-5'>
    //                 {
    //                   !completedLectures.includes(subSectionId) &&
    //                   <IconBtn
    //                   onClick={() => markAsCompleted()}
    //                   text={!loading ? "Mark As Completed" : "Loading..."}
    //                   />
    //                 }

    //                 <IconBtn
    //                 disabled={loading}
    //                 onClick={() => {
    //                   if(playRef?.current){
    //                     playRef?.current?.seek(0)
    //                     setVideoEnded(false)
    //                   }
    //                 }}

    //                 text={"Rewatch"}
    //                 customClassName={"text-xl"}
    //                 ></IconBtn>

    //                 <div className='flex'>
    //                   {
    //                     !isFirstVideo() && (
    //                       <button
    //                       disabled={loading}
    //                       onClick={goToPrevVideo}
    //                       className='blackButton'

    //                       >
    //                       Previous
    //                       </button>
    //                     )
    //                   }

    //                   {
    //                     !isLastVideo() && (
    //                       <button
    //                       disabled={loading}
    //                       onClick={goToNextVideo}
    //                       className='blackButton'

    //                       >
    //                       Next
    //                       </button>
    //                     )
    //                   }

    //                 </div>
    //               </div>
    //             }

    //           </Player>

    //         </div>
    // }

    //     <h1>
    //       {videoData?.title}
    //     </h1>

    //     <p>
    //       {videoData?.description}
    //     </p>

    //     </div>

    <div className="flex flex-col gap-5 text-white">
      {!videoData ? (
        <img
          src={previewSource}
          alt="Preview"
          className="h-full w-full rounded-md object-cover"
        />
      ) : (
        <Player
          ref={playerRef}
          aspectRatio="16:9"
          playsInline
          onEnded={() => setVideoEnded(true)}
          src={videoData?.videoUrl}
        >
          <BigPlayButton position="center" />
          {/* Render When Video Ends */}
          {videoEnded && (
            <div
              style={{
                backgroundImage:
                  "linear-gradient(to top, rgb(0, 0, 0), rgba(0,0,0,0.7), rgba(0,0,0,0.5), rgba(0,0,0,0.1)",
              }}
              className="full absolute inset-0 z-[100] grid h-full place-content-center font-inter"
            >
              {!completedLectures.includes(subSectionId) && (
                <IconBtn
                  disabled={loading}
                  onClick={() => markAsCompleted()}
                  text={!loading ? "Mark As Completed" : "Loading..."}
                  customClasses="text-xl max-w-max px-4 mx-auto"
                />
              )}
              <IconBtn
                disabled={loading}
                onClick={() => {
                  if (playerRef?.current) {
                    // set the current time of the video to 0
                    playerRef?.current?.seek(0);
                    setVideoEnded(false);
                  }
                }}
                text="Rewatch"
                customClasses="text-xl max-w-max px-4 mx-auto mt-2"
              />
              <div className="mt-10 flex min-w-[250px] justify-center gap-x-4 text-xl">
                {!isFirstVideo() && (
                  <button
                    disabled={loading}
                    onClick={goToPrevVideo}
                    className="blackButton"
                  >
                    Prev
                  </button>
                )}
                {!isLastVideo() && (
                  <button
                    disabled={loading}
                    onClick={goToNextVideo}
                    className="blackButton"
                  >
                    Next
                  </button>
                )}
              </div>
            </div>
          )}
        </Player>
      )}

      <h1 className="mt-4 text-3xl font-semibold">{videoData?.title}</h1>
      <p className="pt-2 pb-6">{videoData?.description}</p>
    </div>
  );
};

export default VideoDetails;
