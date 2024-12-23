import { useState } from 'react';
import { SwipeableDrawer } from '@mui/material';
import AllProducts from '../../components/AllProducts/AllProducts';
import Footer from '../../components/Footer/Footer';
import HeaderProducts from '../../components/HeaderProducts/HeaderProducts';
import Navbar from '../../components/Navbar/Navbar';
import DrawerShoppingCart from '../../components/DrawerShoppingCart/DrawerShoppingCart';

const TYPES_MODAL = {
  VIEW_SHOPPING_CART: 'VIEW_SHOPPING_CART',
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

        <AllProducts />
        <Footer />
      </div>

      <SwipeableDrawer
        open={modal.status}
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
