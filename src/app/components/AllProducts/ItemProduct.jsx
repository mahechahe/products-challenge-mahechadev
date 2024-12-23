import {
  FormControl,
  InputLabel,
  MenuItem,
  Rating,
  Select,
} from '@mui/material';

export function ItemProduct({ product }) {
  return (
    <div className="relative ">
      {/* Imagen de producto */}
      <img
        alt={product.imageAlt}
        src={product.imageSrc}
        className="aspect-square w-full rounded-md bg-gray-200 lg:aspect-auto lg:h-[250px]"
        style={{
          objectFit: 'cover',
          objectPosition: 'center',
          maxWidth: '100%',
        }}
      />
      <div className="mt-4 flex flex-col justify-between h-[180px]">
        <div className="h-[100px] ">
          <h3
            className="text-gray-700 font-semibold"
            style={{
              fontSize: '18px',
              marginBottom: '4px',
            }}
          >
            {product.name}
          </h3>
          <p
            className="mt-1 text-gray-500 h-[80px] "
            style={{
              lineHeight: '1.6',
              fontSize: '15px',
              textOverflow: 'ellipsis',
              overflow: 'hidden', // Esconde el desbordamiento
            }}
          >
            {product.desc}
          </p>
        </div>

        <div className="justify-between w-full flex items-center">
          <p
            className="text-lg font-bold text-gray-900 mt-2"
            style={{
              fontSize: '16px',
            }}
          >
            {product.price}
          </p>
          <p
            className="text-lg text-gray-900 mt-2"
            style={{
              fontSize: '16px',
            }}
          >
            <span className="font-bold">{product.totalUnits}</span> unidades en
            stock
          </p>
        </div>
        <div className="mt-3">
          <Rating name="read-only" value={1} readOnly size="medium" />
        </div>
      </div>
      <div className="flex justify-between items-center gap-x-5 mt-5">
        <button
          type="button"
          className="w-[60%] h-[40px] rounded-md bg-gray-100 hover:bg-gray-200 cursor-pointer text-gray-900 font-semibold transition-colors duration-200 ease-in-out flex items-center gap-x-4 justify-center"
          style={{
            letterSpacing: '0.8px',
            fontSize: '14px',
          }}
        >
          Agregar al carrito
        </button>
        <div className="w-[40%] h-[40px]">
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Unidades</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={1}
              label="Unidades"
              onChange={() => {}}
              size="small"
              sx={{
                width: '100%',
              }}
            >
              <MenuItem value={1}>1</MenuItem>
              <MenuItem value={2}>2</MenuItem>
              <MenuItem value={3}>3</MenuItem>
            </Select>
          </FormControl>
        </div>
      </div>
    </div>
  );
}
