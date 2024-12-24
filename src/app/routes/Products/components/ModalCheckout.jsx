/* eslint-disable jsx-a11y/no-redundant-roles */
import { IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { products } from '@/draft';
import { onFormatCurrencyColombian } from '@/app/utils/handleNumbers';
import CustomButton from '@/app/components/CustomButton/CustomButton';
import {
  createPaymentService,
  createTransactionService,
} from '../service/productService';

function ModalCheckout({ handleCloseModal }) {
  /* Config */
  const dispatch = useDispatch();

  /* Selectores */
  const itemsCart = useSelector((state) => state.init.itemsCart);

  /* States */
  const [productsSelected, setProductsSelected] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totals, setTotals] = useState({
    taxes: 0,
    whitTaxes: 0,
    whitOutTaxes: 0,
  });

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

      const taxAmount = Math.floor(totalPrice * 0.17);

      /* Calcular el total con el 17% descontado */
      const totalWithTax = totalPrice + taxAmount + 5000;

      setTotals({
        whitOutTaxes: totalPrice,
        whitTaxes: totalWithTax,
        taxes: taxAmount,
      });
      setProductsSelected(getItems);
    }
  };

  const payWompi = async () => {
    setLoading(true);
    const getDataLocal = localStorage.getItem('clientDetail');

    if (!getDataLocal) {
      return;
    }

    const parseData = JSON.parse(getDataLocal);

    const producstJoin = itemsCart.join(', ');

    const body = {
      idClient: parseData.identificationClient,
      identificationClient: parseData.identificationClient,
      productsTransaction: producstJoin,
      totalTransaction: totals.whitTaxes,
      totalTransactionWhitoutTaxes: totals.whitOutTaxes,
      taxesTransaction: totals.taxes,
      phoneClient: parseData.phoneClient,
      emailClient: parseData.emailClient,
      cityClient: parseData.cityClient,
      adressClient: parseData.adressClient,
    };

    const res = await dispatch(createTransactionService(body));

    if (!res.status) {
      setLoading(false);
      toast.error('Ha ocurrido un error al crear la transacción');
      return;
    }

    const randomNumber = String(
      Math.floor(Math.random() * 10000000000000000),
    ).padStart(16, '0');

    /* Iniciar proceso de pago con WOMPI */
    const bodyPaymentWompi = {
      acceptance_token: parseData.aceptedToken,
      id_client: parseData.identificationClient,
      session_id: randomNumber,
      payment_method: {
        type: 'CARD',
        token: parseData.idTokenCard,
        installments: 2,
      },
      transaction_id: res.data.idTransaction,
    };

    const resIntWompi = await dispatch(createPaymentService(bodyPaymentWompi));
    if (resIntWompi.status) {
      toast.success(
        'El pago está siendo procesado. Te enviaremos un correo cuando se haya confirmado',
      );
      handleCloseModal();
    }

    setLoading(false);
  };

  /* useEffect */

  useEffect(() => {
    if (itemsCart && itemsCart.length > 0) {
      buildData();
    }
  }, [itemsCart]);

  return (
    <div className="w-full px-4 md:w-[500px] min-h-[400px] py-2 h-auto">
      <div className="w-full h-full pb-1 bg-white rounded-lg shadow-lg relative overflow-hidden">
        <div className="md:px-6 px-3 py-4 flex flex-col justify-start">
          {/* Header */}
          <div className="w-full flex gap-7 items-center justify-between">
            <div className="flex items-center gap-x-4">
              <h3 className="text-lg text-indigo-400 font-semibold">
                DETALLES DE LA COMPRA
              </h3>
            </div>
            <IconButton onClick={handleCloseModal} disabled={loading}>
              <CloseIcon
                sx={{ color: '#6366f1 ', width: '25px', height: '25px' }}
              />
            </IconButton>
          </div>

          <div className="scroll-container overflow-y-scroll pr-2 h-[200px] mt-4">
            <ul role="list" className="-my-6 divide-y divide-gray-200 ">
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
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="w-full ">
            <div className="border-t border-gray-200 py-6">
              <div className="flex justify-between text-base font-medium text-gray-900 py-2">
                <p className="text-gray-500">Subtotal</p>
                <p>{onFormatCurrencyColombian(totals.whitOutTaxes)}</p>
              </div>
              <div className="flex justify-between text-base font-medium text-gray-900 border-t-2 py-2">
                <p className="text-gray-500">Estimación de envío</p>
                <p>{onFormatCurrencyColombian(5000)}</p>
              </div>
              <div className="flex justify-between text-base font-medium text-gray-900 border-t-2 py-2">
                <p className="text-gray-500">Estimación de impuestos</p>
                <p>{onFormatCurrencyColombian(totals.taxes)}</p>
              </div>

              <div className="flex justify-between text-base font-medium text-gray-900 border-t-2 py-3">
                <p className="text-gray-500">Total orden</p>
                <p>{onFormatCurrencyColombian(totals.whitTaxes)}</p>
              </div>

              <div className="w-full mt-6">
                <CustomButton
                  label={loading ? 'Pagando..' : 'Confirmar y pagar'}
                  disabled={
                    totals.whitTaxes === 0 ||
                    productsSelected.length === 0 ||
                    loading
                  }
                  onClick={payWompi}
                  loading={loading}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ModalCheckout;
