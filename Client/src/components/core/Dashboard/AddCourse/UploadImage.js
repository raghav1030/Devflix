import React, { useState } from 'react'

const UploadImage = ({register , setValue, name, label, placeholder, errors, watch  }) => {

    const [thumbnailPreview , setThumbnailPreview] = useState(null)
    const [thumbnail , setThumbnail] = useState(null)

    function handleChange(e){
        const file = e.target.files[0]

        if(file){
            setThumbnail(file)
            // setValue(name , file)
            console.log(thumbnail)
            previewFile(file)

        }
    }

    function previewFile(file){
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onloadend = () => {
            console.log("reader",reader)
            setThumbnailPreview(reader.result)
        }
    }

    useState(()=>{
        if(thumbnail){
            previewFile(thumbnail)
        }
    } , [thumbnail])

    


return (
    <label >

        <p>{label} <sup>*</sup> </p>

        <div className={`${thumbnailPreview ? 'flex' : 'hidden'} w-fit h-fit `}  >
            {
                <img src={thumbnailPreview} alt="Course Thumbnail" className='aspect w-fit object-fit ' />
            }
        </div>

        <input type="file" 
        placeholder={placeholder}
        {...register(name, {required : true})}
        // onKeyDown={handleKeyDown}
        onChange={handleChange}
        className='text-richblack-900 '
        />
        {
            errors && 
            <div>
                this field is required
            </div>
        }
    </label>
)
}

export default UploadImage