import React from 'react'
import IconBtn from './IconBtn'



const ConfirmationModal = ({modalData}) => {

  console.log(modalData)

  return (
    <div className='w-screen absolute z-20 bg-blur ' >
        <div>
            <p>
                {modalData.text1}
            </p>

            <p>
                {modalData.text2}
            </p>

            <IconBtn 
            onClick={modalData?.btn1Handler}
            text={modalData?.btn1Text}
            ></IconBtn>

            <button onClick={modalData?.btn2Handler} >{modalData?.btn2Text}</button>
        </div>
    </div>
  )
}

export default ConfirmationModal