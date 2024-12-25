import { Modal, SwipeableDrawer } from '@mui/material';
import { useState } from 'react';
import AllProducts from '../../components/AllProducts/AllProducts';
import DrawerShoppingCart from '../../components/DrawerShoppingCart/DrawerShoppingCart';
import Footer from '../../components/Footer/Footer';
import HeaderProducts from '../../components/HeaderProducts/HeaderProducts';
import Navbar from '../../components/Navbar/Navbar';
import ModalAddCard from './components/ModalAddCard';
import ModalCheckout from './components/ModalCheckout';

const TYPES_MODAL = {
  VIEW_SHOPPING_CART: 'VIEW_SHOPPING_CART',
  PAYMENT_SUCCESS: 'PAYMENT_SUCCESS',
  PAYMENT_ERROR: 'PAYMENT_ERROR',
  PAYMENT_PENDING: 'PAYMENT_PENDING',
  CHECKOUT_DETAIL: 'CHECKOUT_DETAIL',
  DATA_PAYMENT: 'DATA_PAYMENT',
};

const INIT_MODAL = {
  status: false,
  type: null,
};

function Products() {
  /* States */
  const [modal, setModal] = useState(INIT_MODAL);

  /* Functions */
  const handleCloseModal = () => setModal(INIT_MODAL);

  const handleOpenModal = (type) => {
    setModal({
      status: true,
      type,
    });
  };

  return (
    <>
      <div className="w-full min-h-screen h-auto">
        <Navbar
          handleClickCart={() =>
            handleOpenModal(TYPES_MODAL.VIEW_SHOPPING_CART)
          }
        />
        <HeaderProducts />

        <AllProducts
          handleOpenModal={() => handleOpenModal(TYPES_MODAL.DATA_PAYMENT)}
        />
        <Footer />
      </div>

      {/* Modals */}
      <Modal
        open={modal.status && modal.type !== TYPES_MODAL.VIEW_SHOPPING_CART}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <>
          <div className="w-full h-full flex flex-col items-center justify-center">
            {modal.type === TYPES_MODAL.DATA_PAYMENT && (
              <ModalAddCard
                handleCloseModal={handleCloseModal}
                handleOpenModalToCheckout={() =>
                  handleOpenModal(TYPES_MODAL.CHECKOUT_DETAIL)
                }
              />
            )}
            {modal.type === TYPES_MODAL.CHECKOUT_DETAIL && (
              <ModalCheckout
                handleCloseModal={handleCloseModal}
                TYPES_MODAL={TYPES_MODAL}
              />
            )}
          </div>
        </>
      </Modal>

      {/* Drawers */}
      <SwipeableDrawer
        open={modal.status && modal.type !== TYPES_MODAL.DATA_PAYMENT}
        onClose={handleCloseModal}
        anchor="right"
      >
        <>
          {modal.type === TYPES_MODAL.VIEW_SHOPPING_CART && (
            <DrawerShoppingCart
              handleCloseModal={handleCloseModal}
              handleOpenModalToAddCard={() =>
                handleOpenModal(TYPES_MODAL.DATA_PAYMENT)
              }
            />
          )}
        </>
      </SwipeableDrawer>
    </>
  );
}

export default Products;
