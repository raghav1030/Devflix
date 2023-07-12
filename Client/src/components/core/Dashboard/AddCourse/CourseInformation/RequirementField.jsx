import React, { useEffect, useState } from 'react'

const RequirementField = ({register , setValue, name, label, placeholder, errors  }) => {

    const [requirement, setRequirement] = useState('')
    const [requirementList, setRequirementList] = useState([])


    const addRequirement = ()=>{
        if(requirement.trim() !== ''){

            console.log('Printing List Before adding' , requirementList)

            setRequirementList((prev) => [...prev, requirement] )
            // setRequirement('')
            console.log("requirementList after adding" , requirementList)
        }
    }

    const handleKeyDown = (e) => {
        if(e.key=== "Enter" && e.target.value.trim() !== ''){
            addRequirement()
            e.target.value = ''
        }
    }

    const removeRequirement = (index) => {
        let newArray = [...requirementList]

        newArray.splice(index, 1)

        setRequirementList(newArray)
    }

    useEffect(()=>{
        register(name,
            {
                required : true,
                validate : (value) => value.length > 0
            })
    },[])

    useEffect(()=>{
        if(requirement){
            setValue(name, requirement)
        }
    }, [requirement, name] )



    return (
        <div>
            <label >

                <p>{label}</p>

                <input type="text" className='text-richblack-900' placeholder={placeholder} onChange={(e) => setRequirement(e.target.value)} onKeyDown={handleKeyDown}   />

                <div className='bg-yellow-50 text-richblack-900 ' onClick={addRequirement} >
                    Add
                </div>

                {
                    errors && <span>
                        This field is required
                    </span>
                }
            </label>

            {
                requirementList && 
                <ul>
                    
                    {
                        requirementList.map((item, index) => (
                            <div key={index} className='flex gap-4 bg-transparent text-richblack-100 ' >
                            
                            <li  >
                                {item}
                                
                            </li>

                            <div onClick={() => removeRequirement(index)}  >Clear</div>
                            </div>
                        ))
                    }

                </ul>
            }
        </div>
    )
}

export default RequirementField