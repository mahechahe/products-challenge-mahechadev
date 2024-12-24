/* eslint-disable react/button-has-type */
import CircularProgress from '@mui/material/CircularProgress';

function CustomButton({
  label,
  height,
  disabled,
  onClick,
  icon,
  type,
  loading,
  typeButton,
  accept,
}) {
  if (type === 'error') {
    return (
      <button
        type={typeButton || 'button'}
        className="px-4 py-2 duration-150 rounded-lg hover:bg-[#fae0e4] active:bg-indigo-200 flex items-center gap-3 justify-center w-full text-md disabled:bg-indigo-50 disabled:text-indigo-600"
        style={{
          height: height || '40px',
          border: '1px solid #ef233c',
          color: '#ef233c',
        }}
        disabled={disabled}
        onClick={onClick}
        accept={accept}
      >
        {icon}
        {label}
      </button>
    );
  }

  if (type === 'success') {
    return (
      <button
        type={typeButton || 'button'}
        className="px-4 py-2 duration-150 rounded-lg hover:bg-[#ecfaf1] active:bg-[#ecfaf1] flex items-center gap-3 justify-center w-full text-md disabled:bg-[#ecfaf1] disabled:text-indigo-600"
        style={{
          height: height || '40px',
          border: '1px solid #18a44b',
          color: '#18a44b',
        }}
        disabled={disabled}
        onClick={onClick}
        accept={accept}
      >
        {icon}
        {label}
      </button>
    );
  }

  if (type === 'secondary') {
    return (
      <button
        type={typeButton || 'button'}
        className="px-4 py-2 text-indigo-600 duration-150 bg-indigo-50 rounded-lg hover:bg-indigo-100 active:bg-indigo-200 flex items-center gap-3 justify-center w-full text-md"
        style={{
          height: height || '40px',
        }}
        disabled={disabled}
        onClick={onClick}
        accept={accept}
      >
        {icon}
        {label}
      </button>
    );
  }

  return (
    <button
      type={typeButton || 'button'}
      className="w-full px-4 py-2 text-white font-medium bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-600 rounded-lg duration-150 text-md disabled:bg-indigo-50 disabled:text-indigo-600 flex items-center gap-3 justify-center"
      style={{
        height: height || '40px',
      }}
      disabled={disabled}
      onClick={onClick}
    >
      {icon}
      {label}

      {loading && (
        <CircularProgress
          style={{
            color: '#4f46e5',
            width: '25px',
            height: '25px',
            marginLeft: '6px',
          }}
        />
      )}
    </button>
  );
}

export default CustomButton;
