/* eslint-disable jsx-a11y/control-has-associated-label */
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { Rating } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useSelector } from 'react-redux';
import { onFormatCurrencyColombian } from '../../utils/handleNumbers';

export function ItemProduct({
  product,
  addNewProduct,
  addNewFavorite,
  remoteItemFavorites,
}) {
  /* Selectores */
  const itemsCart = useSelector((state) => state.init.itemsCart);
  const favorites = useSelector((state) => state.init.favorites);

  /* Validations */
  const isSelectedItem = itemsCart.includes(product.id);
  const isFavoriteItem = favorites.includes(product.id);

  return (
    <div className="relative ">
      {/* Favorite icon */}
      {isFavoriteItem && (
        <div className="w-[40px] h-[40px] absolute top-0 right-0 flex justify-center items-center">
          <FavoriteIcon
            sx={{
              color: '#ef4444 ',
            }}
          />
        </div>
      )}

      {/* Imagen de producto */}
      <img
        alt={product.imageAlt}
        src={`/images/${product.imageSrc}`}
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
            {onFormatCurrencyColombian(product.price)}
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
        {isSelectedItem ? (
          <div
            className="w-[80%] h-[40px] rounded-md bg-green-100 text-green-900 font-semibold transition-colors duration-200 ease-in-out flex items-center gap-x-4 justify-center"
            style={{
              letterSpacing: '0.8px',
              fontSize: '14px',
            }}
          >
            Producto en el carrito <CheckCircleOutlineIcon />
          </div>
        ) : (
          <button
            type="button"
            className="w-[80%] h-[40px] rounded-md bg-gray-100 hover:bg-gray-200 cursor-pointer text-gray-900 font-semibold transition-colors duration-200 ease-in-out flex items-center gap-x-4 justify-center"
            style={{
              letterSpacing: '0.8px',
              fontSize: '14px',
            }}
            onClick={() => addNewProduct(product.id)}
          >
            Agregar al carrito
          </button>
        )}
        <button
          type="button"
          className="w-[20%] h-[40px] rounded-md bg-gray-100 hover:bg-gray-200 cursor-pointer  font-semibold transition-colors duration-200 ease-in-out flex items-center gap-x-4 justify-center"
          onClick={() => {
            if (isFavoriteItem) {
              remoteItemFavorites(product.id);
              return;
            }
            addNewFavorite(product.id);
          }}
        >
          {isFavoriteItem ? <FavoriteIcon /> : <FavoriteBorderIcon />}
        </button>
      </div>
    </div>
  );
}
