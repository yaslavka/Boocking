import React from "react";

function InputHotel({field, form, ...props}) {
    return (
        <>
            <textarea {...field} {...props} style={{height: props.heightTextarea}}/>
        </>
    )
}
export default InputHotel