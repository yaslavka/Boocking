import React from "react";

function ChatInput({placeholder, type, name, field, form, ...props }) {
    return (
        <>
            <input
                type={type}
                name={name}
                placeholder={placeholder}
                {...field} {...props}/>
        </>
    )
}
export default ChatInput