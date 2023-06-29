import React, { useCallback, useEffect, useState } from 'react'

const ChipInput = ({register , setValue, name, label, placeholder, errors, watch  }) => {

    const [inputTags , setInputTags] = useState([])
    const [tag , setTag] = useState('')

    const handleChange = useCallback((e) => {

        const value = e.target.value.trim()

        setTag(value)

        // console.log(tag)

    },[ tag])

    

    const handleKeyDown = useCallback((e) => {

        const value = e.target.value.trim()
        // console.log(e.target.value.trim())

        if(e.key === 'Enter' && value !== ''){

            setInputTags((prev) => [...prev, tag]);

            
            // setValue(name, [...inputTags, tag]);  

        e.target.value = ''
        console.log(watch(name))

        }
    },[inputTags , setValue, watch, name, tag ] )


    const removeTag = useCallback(( name , index)=>{
        console.log(name)
        console.log(index)
        
        setInputTags((prev) => {
            const newArray = [...prev]
            newArray.splice(index , 1 )
            return newArray
        })   

        
        
        // setValue(name, inputTags.filter((_,i) => i !== index).join(', ') );  
        
        console.log(watch(name))
    
    }, [inputTags , setValue, watch])


    useEffect(()=>{
        register(name, {
            required : true,
            validate : (value) => value.length > 0
        })
    },[])

    useEffect(()=>{
        if(inputTags){
            setValue(name, inputTags)
        }
        console.log('watch(tag) from useEffect' , watch(name))
    } , [inputTags])

return (
    <label >

        <div className={`text-black bg-yellow-50 ${inputTags.length === 0 && "hidden" } `}   >
            {
                inputTags.map((item , index) => (   
                    
                    <div className='flex ' key={index} >


                        <div  >
                            {item}
                            
                            <div onClick={() => removeTag(name,index)}>
                                remove
                            </div>

                        </div>

                        
                    </div>
                ))
            }

            
        </div>

        <p>{label} <sup>*</sup> </p>

        <input type="text" 
        placeholder={placeholder}
        // {...register(name, {required : true})}
        onKeyDown={handleKeyDown}
        onChange={handleChange}
        className='text-richblack-900 '
        />
        {
            errors && 
            <div>
                This field is required
            </div>
        }
    </label>
)
}

export default ChipInput