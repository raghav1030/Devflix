import React from 'react'

const HighlightText = ({text , gradientColors}) => {
    return (
        <span className={`bg-gradient-to-br ${gradientColors ? (gradientColors) : ('from-[#1FA2FF] via-[#12D8FA]  to-[#A6FFCB]') }  text-transparent bg-clip-text`}  >
            {" "}
            {text}
            {" "}
        </span>
    )
}

export default HighlightText