/* eslint-disable jsx-a11y/no-autofocus */

function CustomTextFieldHoookForm({
  type,
  required,
  placeholder,
  height,
  name,
  autoFocus,
  multiline,
  rows,
  error,
  errorMessage,
  disabled,
  register,
  id,
}) {
  if (multiline) {
    return (
      <div className=" m-0 p-0 flex flex-col relative ">
        <textarea
          id={id}
          name={name}
          required={required}
          placeholder={placeholder}
          className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg text-md"
          style={{
            minHeight: '38px',
            resize: 'none',
            border: error && '1px solid #dd2d4a',
          }}
          rows={rows}
          disabled={disabled}
          {...register}
        />

        {error && (
          <p
            className="absolute -bottom-8 text-sm "
            style={{ color: '#dd2d4a' }}
          >
            {errorMessage}
          </p>
        )}
      </div>
    );
  }
  return (
    <div className=" m-0 p-0 flex flex-col relative">
      <input
        id={id}
        name={name}
        type={type || 'text'}
        required={required}
        placeholder={placeholder}
        className="w-full px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg text-md"
        style={{
          height: height || '38px',
          border: error && '1px solid #dd2d4a',
          background: disabled ? '#edf2fb' : 'transparent',
        }}
        autoFocus={autoFocus}
        disabled={disabled}
        {...register}
      />

      {error && (
        <p className="absolute -bottom-5 text-sm " style={{ color: '#dd2d4a' }}>
          {errorMessage}
        </p>
      )}
    </div>
  );
}

export default CustomTextFieldHoookForm;
