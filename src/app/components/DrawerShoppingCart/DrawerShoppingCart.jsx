/* eslint-disable jsx-a11y/no-redundant-roles */
import CloseIcon from '@mui/icons-material/Close';
import { IconButton } from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { products } from '../../../draft';
import { onFormatCurrencyColombian } from '../../utils/handleNumbers';
import CustomButton from '../CustomButton/CustomButton';
import { setRemoteItemToCart } from '../../store/initSlice/initSLice';

function DrawerShoppingCart({ handleCloseModal }) {
  /* Config */
  const dispatch = useDispatch();

  /* Selectores */
  const itemsCart = useSelector((state) => state.init.itemsCart);

  /* States */
  const [productsSelected, setProductsSelected] = useState([]);
  const [priceToPay, setPriceToPay] = useState(0);

  /* Functions */
  const buildData = () => {
    const getItems = itemsCart
      .map((it) => {
        const findItem = products.find((item) => item.id === it);
        if (!findItem) return false;

        const { name, id, imageSrc, imageAlt, price, color, desc } = findItem;
        return {
          name,
          id,
          imageSrc,
          imageAlt,
          price,
          color,
          desc,
        };
      })
      .filter((it) => it);

    if (getItems && getItems.length > 0) {
      const totalPrice = getItems.reduce(
        (sum, product) => sum + product.price,
        0,
      );
      setPriceToPay(totalPrice);
      setProductsSelected(getItems);
    }
  };

  const handleRemoveItem = (productId) => {
    dispatch(setRemoteItemToCart(productId));

    const filteredItems = productsSelected.filter((it) => it.id !== productId);
    const totalPrice = filteredItems.reduce(
      (sum, product) => sum + product.price,
      0,
    );
    setPriceToPay(totalPrice);
    setProductsSelected(filteredItems);

    toast.success('El producto ha sido eliminado del carrito');
  };

  /* useEffect */

  useEffect(() => {
    if (itemsCart && itemsCart.length > 0) {
      buildData();
    }
  }, [itemsCart]);

  return (
    <div
      className="h-full w-[400px] bg-white gap-4 grid"
      style={{
        gridTemplateRows: '1.6fr 0.4fr',
        height: '100dvh',
      }}
    >
      <div className="w-full px-5 py-5 overflow-y-scroll scroll-container">
        <div className="w-full flex items-center justify-between">
          <h2
            className="text-lg text-gray-900"
            style={{
              fontWeight: 500,
            }}
          >
            Carrito de compras
          </h2>

          <IconButton onClick={handleCloseModal}>
            <CloseIcon />
          </IconButton>
        </div>

        <div className="mt-8">
          <div className="flow-root">
            {productsSelected.length === 0 ? (
              <div className="w-full h-[150px] border rounded-md flex flex-col justify-center items-center text-center px-12">
                <h3
                  className="text-gray-700 font-semibold "
                  style={{
                    fontSize: '16px',
                    marginBottom: '4px',
                  }}
                >
                  No has agregado ningún producto al carrito
                </h3>
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="font-medium text-indigo-600 hover:text-indigo-500"
                >
                  Ir a agregar
                  <span aria-hidden="true"> &rarr;</span>
                </button>
              </div>
            ) : (
              <ul role="list" className="-my-6 divide-y divide-gray-200">
                {productsSelected.map((product) => (
                  <li key={product.id} className="flex py-6">
                    <div className="size-24 shrink-0 overflow-hidden rounded-md border border-gray-200">
                      <img
                        alt={product.imageAlt}
                        src={`/public/images/${product.imageSrc}`}
                        className="size-full object-cover"
                      />
                    </div>

                    <div className="ml-4 flex flex-1 flex-col">
                      <div>
                        <div className="flex justify-between text-base font-medium text-gray-900">
                          <h3>
                            <p>{product.name}</p>
                          </h3>
                          <p className="ml-4">
                            {onFormatCurrencyColombian(product.price)}
                          </p>
                        </div>
                        <p className="mt-1 text-sm text-gray-500">
                          <span className="font-semibold">Color:</span>{' '}
                          {product.color}
                        </p>
                      </div>
                      <div className="flex flex-1 items-end justify-between text-sm">
                        <p className="text-gray-500">
                          <span className="font-semibold">Cantidad:</span> 1
                        </p>

                        <div className="flex">
                          <button
                            type="button"
                            className="font-medium text-indigo-600 hover:text-indigo-500"
                            onClick={() => handleRemoveItem(product.id)}
                          >
                            Eliminar
                          </button>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>

      <div className="w-full ">
        <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
          <div className="flex justify-between text-base font-medium text-gray-900">
            <p>Subtotal</p>
            <p>{onFormatCurrencyColombian(priceToPay)}</p>
          </div>
          <p className="mt-0.5 text-sm text-gray-500">
            Envío e impuestos calculados al realizar el pago.
          </p>
          <div className="w-full mt-6">
            <CustomButton
              label="Pagar con tarjeta de crédito"
              disabled={priceToPay === 0 || productsSelected.length === 0}
            />
          </div>
          <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
            <p>
              o{' '}
              <button
                type="button"
                onClick={handleCloseModal}
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Seguir comprando
                <span aria-hidden="true"> &rarr;</span>
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DrawerShoppingCart;
