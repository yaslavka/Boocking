import React from 'react'

function ChatInput({
  className,
  placeholder,
  type,
  name,
  field,
  form,
  ...props
}) {
  return (
    <>
      <input
        className={className}
        type={type}
        name={name}
        placeholder={placeholder}
        {...field}
        {...props}
      />
    </>
  )
}
export default ChatInput
