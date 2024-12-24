/* eslint-disable jsx-a11y/no-autofocus */
function CustomTextField({
  type,
  required,
  placeholder,
  onChange,
  height,
  value,
  name,
  autoFocus,
  multiline,
  rows,
  error,
  errorMessage,
  disabled,
  id,
}) {
  if (multiline) {
    return (
      <textarea
        id={id}
        name={name}
        required={required}
        placeholder={placeholder}
        onChange={onChange}
        value={value}
        className="w-full mt-2 px-3 py-2 text-gray-900 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg text-lg"
        style={{ minHeight: '38px', resize: 'none' }}
        rows={rows}
        disabled={disabled}
      />
    );
  }
  return (
    <div className=" m-0 p-0 flex flex-col relative ">
      <input
        id={id}
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        onChange={onChange}
        value={value}
        className="w-full px-3 py-2 text-gray-900 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg text-md"
        style={{ height: height || '38px' }}
        autoFocus={autoFocus}
        disabled={disabled}
      />
      {error && (
        <p className="absolute -bottom-5 text-sm " style={{ color: '#dd2d4a' }}>
          {errorMessage}
        </p>
      )}
    </div>
  );
}

export default CustomTextField;
