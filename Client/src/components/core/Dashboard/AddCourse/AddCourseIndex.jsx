import React from 'react'
import RenderSteps from './RenderSteps'
import { useSelector } from 'react-redux'
import PublishCourse from './PublishCourse'
import CourseBuilderForm from './CourseBuilder/CourseBuilderForm'
import CourseInformationForm from './CourseInformation/CourseInformationForm'

const AddCourseIndex = () => {

    const {step} = useSelector((state) => state.course)

return (
    <div>
        <h1>Add Course</h1>

        <div>
            <RenderSteps></RenderSteps>
        </div>

        <div>
            {step === 1 && <CourseInformationForm/>}
            {step === 2 && <CourseBuilderForm/>}
            {step === 3 && <PublishCourse/>}
        </div>


    </div>
)
}

export default AddCourseIndex