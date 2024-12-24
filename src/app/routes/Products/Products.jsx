import { useEffect, useState } from 'react';
import { SwipeableDrawer } from '@mui/material';
import AllProducts from '../../components/AllProducts/AllProducts';
import Footer from '../../components/Footer/Footer';
import HeaderProducts from '../../components/HeaderProducts/HeaderProducts';
import Navbar from '../../components/Navbar/Navbar';
import DrawerShoppingCart from '../../components/DrawerShoppingCart/DrawerShoppingCart';
import CustomButton from '../../components/CustomButton/CustomButton';

const TYPES_MODAL = {
  VIEW_SHOPPING_CART: 'VIEW_SHOPPING_CART',
  DATA_PAYMENT: 'DATA_PAYMENT',
};

const INIT_MODAL = {
  status: false,
  type: null,
};

const KEY_PUBLIC_COMERCIO = 'pub_test_nB5K4M8rtYBo1dfHeJx8lcHpF65AvwrX';
// const KEY_PUBLIC_COMERCIO = 'pub_stagtest_g2u0HQd3ZMh05hsSgTS2lUV8t3s4mOt7';
const KEY_PRIVATE_COMERCIO = 'prv_stagtest_5i0ZGIGiFcDQifYsXxvsny7Y37tKqFWg';
const SIGN_INTEGRITY = 'stagtest_integrity_nAIBuqayW70XpUqJS4qf4STYiISd89Fp';
const WOMPI_EVENTS = 'stagtest_events_2PDUmhMywUkvb1LvxYnayFbmofT7w39N';

const REDIRECT_URI = 'http://localhost:5173/confirmacion-transaccion/2';

const REFERENCE_PAY = '3b4393bafed398ba24534543tfdgr656456rty565756';

function Products() {
  /* States */
  const [modal, setModal] = useState(INIT_MODAL);
  const [hash, setHash] = useState('');

  /* Functions */
  const handleCloseModal = () => setModal(INIT_MODAL);

  const handleOpenModal = (type) => {
    setModal({
      status: true,
      type,
    });
  };

  const payWompi = () => {
    window.open(
      `https://checkout.wompi.co/p/?public-key=${KEY_PUBLIC_COMERCIO}&currency=COP&amount-in-cents=${25000}00&reference=${REFERENCE_PAY}&redirect-url=${REDIRECT_URI}`,
      '_self',
    );
  };

  const generateHash = async () => {
    const hashRef = `${REFERENCE_PAY}${2500000}COP${SIGN_INTEGRITY}`;

    const encondedText = new TextEncoder().encode(hashRef);
    const hashBuffer = await crypto.subtle.digest('SHA-256', encondedText);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray
      .map((b) => b.toString(16).padStart(2, '0'))
      .join('');

    setHash(hashHex);
  };

  useEffect(() => {
    generateHash();
  }, []);

  console.log('hash', hash);

  return (
    <>
      <div className="w-full min-h-screen h-auto">
        <Navbar
          handleClickCart={() =>
            handleOpenModal(TYPES_MODAL.VIEW_SHOPPING_CART)
          }
        />
        <HeaderProducts />

        <AllProducts />
        <Footer />

        <CustomButton label="Pagar WOMPI" onClick={payWompi} />
        <form action="https://checkout.wompi.co/p/" method="GET">
          {/* <!-- OBLIGATORIOS --> */}
          <input type="hidden" name="public-key" value={KEY_PUBLIC_COMERCIO} />
          <input type="hidden" name="currency" value="COP" />
          <input type="hidden" name="amount-in-cents" value={`${25000}00`} />
          <input type="hidden" name="reference" value={REFERENCE_PAY} />
          <input type="hidden" name="signature:integrity" value={hash} />
          {/* <!-- OPCIONALES --> */}
          {/* <input type="hidden" name="redirect-url" value="URL_REDIRECCION" />
          <input
            type="hidden"
            name="expiration-time"
            value="FECHA_EXPIRACION"
          />
          <input
            type="hidden"
            name="tax-in-cents:vat"
            value="IVA_EN_CENTAVOS"
          />
          <input
            type="hidden"
            name="tax-in-cents:consumption"
            value="IMPOCONSUMO_EN_CENTAVOS"
          />
          <input
            type="hidden"
            name="customer-data:email"
            value="CORREO_DEL_PAGADOR"
          />
          <input
            type="hidden"
            name="customer-data:full-name"
            value="NOMBRE_DEL_PAGADOR"
          />
          <input
            type="hidden"
            name="customer-data:phone-number"
            value="NUMERO_DE_TELEFONO_DEL_PAGADOR"
          />
          <input
            type="hidden"
            name="customer-data:legal-id"
            value="DOCUMENTO_DE_IDENTIDAD_DEL_PAGADOR"
          />
          <input
            type="hidden"
            name="customer-data:legal-id-type"
            value="TIPO_DEL_DOCUMENTO_DE_IDENTIDAD_DEL_PAGADOR"
          />
          <input
            type="hidden"
            name="shipping-address:address-line-1"
            value="DIRECCION_DE_ENVIO"
          />
          <input
            type="hidden"
            name="shipping-address:country"
            value="PAIS_DE_ENVIO"
          />
          <input
            type="hidden"
            name="shipping-address:phone-number"
            value="NUMERO_DE_TELEFONO_DE_QUIEN_RECIBE"
          />
          <input
            type="hidden"
            name="shipping-address:city"
            value="CIUDAD_DE_ENVIO"
          />
          <input
            type="hidden"
            name="shipping-address:region"
            value="REGION_DE_ENVIO"
          /> */}
          <button type="submit">Pagar con Wompi</button>
        </form>
      </div>

      <SwipeableDrawer
        open={modal.status && modal.type !== TYPES_MODAL.DATA_PAYMENT}
        onClose={handleCloseModal}
        anchor="right"
      >
        <>
          {modal.type === TYPES_MODAL.VIEW_SHOPPING_CART && (
            <DrawerShoppingCart handleCloseModal={handleCloseModal} />
          )}
        </>
      </SwipeableDrawer>
    </>
  );
}

export default Products;
