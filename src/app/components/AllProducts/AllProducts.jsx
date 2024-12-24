import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import toast from 'react-hot-toast';
import {
  setAddItemsCartByLocal,
  setAddItemsFavoriteByLocal,
  setAddItemToCart,
  setAddItemToFavorites,
  setRemoteItemToFavorites,
} from '../../store/initSlice/initSLice';
import { ItemProduct } from './ItemProduct';
import CustomButton from '../CustomButton/CustomButton';
import { products } from '../../../draft';

function AllProducts() {
  /* Config */
  const dispatch = useDispatch();

  /* Functions */
  const addNewProduct = (newProd) => {
    dispatch(setAddItemToCart(newProd));
    toast.success('Producto añadido al carrito');
  };

  const addNewFavorite = (newProd) => {
    dispatch(setAddItemToFavorites(newProd));
    toast.success('Producto añadido a favoritos');
  };
  const remoteItemFavorites = (idProd) => {
    dispatch(setRemoteItemToFavorites(idProd));
    toast.success('El producto ha sido eliminado de tus favoritos');
  };

  const findDataLocal = () => {
    const findItems = localStorage.getItem('productsCart');
    if (findItems) {
      const itemsParsed = JSON.parse(findItems);
      dispatch(setAddItemsCartByLocal(itemsParsed || []));
    }

    const findFavorites = localStorage.getItem('favorites');
    if (findFavorites) {
      const itemsParsed = JSON.parse(findFavorites);
      dispatch(setAddItemsFavoriteByLocal(itemsParsed || []));
    }
  };

  /* useEffect */

  useEffect(() => {
    findDataLocal();
  }, []);

  return (
    <div className="w-full overflow-hidden px-16 mt-16 h-auto mb-40">
      <div className="bg-white">
        <div className="w-full">
          <div className="w-full flex justify-between items-center">
            <h2 className="text-2xl font-bold tracking-tight text-gray-900">
              NUESTROS PRODUCTOS
            </h2>

            <div className="w-[300px]">
              <CustomButton label="Pagar con tarjeta de crédito" />
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-x-4 gap-y-12 sm:grid-cols-2 lg:grid-cols-5 xl:gap-x-6">
            {products.map((product) => (
              <ItemProduct
                key={product.id}
                product={product}
                addNewProduct={addNewProduct}
                addNewFavorite={addNewFavorite}
                remoteItemFavorites={remoteItemFavorites}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AllProducts;
