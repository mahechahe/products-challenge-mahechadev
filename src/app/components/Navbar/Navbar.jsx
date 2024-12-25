import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import { IconButton } from '@mui/material';
import { useSelector } from 'react-redux';

function ItemNav({ title }) {
  return (
    <li className="w-[100px] flex justify-center items-center rounded-md h-full hover:bg-gray-100 duration-300 ease-in-out">
      <a href="www" className="">
        {title}
      </a>
    </li>
  );
}

function Navbar({ handleClickCart }) {
  /* Selectores */
  const itemsCart = useSelector((state) => state.init.itemsCart);
  const favorites = useSelector((state) => state.init.favorites);

  return (
    <header className="w-full py-6 px-16 flex items-center fixed top-0 justify-between bg-white z-50">
      <figure className="w-[200px] lg:block hidden">
        <img
          src="https://scooterscolombia.com/wp-content/uploads/2024/10/logo_black_orange_no_bg-1.png"
          alt=""
          className="w-full"
        />
      </figure>
      <nav className="md:block hidden">
        <ul className="flex text-lg [&>li>a]:inline-block [&>li>a]:px-4 [&>li>a]:py-3">
          <ItemNav title="Productos" />
          <ItemNav title="Reviews" />
          <ItemNav title="Nosotros" />
        </ul>
      </nav>
      <div className="md:w-[200px] w-full flex md:justify-end justify-center items-center mt-4 md:mt-0 gap-x-8 ">
        <div className="relative w-[30px] h-[30px] flex justify-end items-center">
          <div className="bg-gray-100 h-[25px] w-[25px] flex justify-center items-center rounded-full absolute -top-5 right-0">
            <span
              style={{
                fontSize: '14px',
              }}
              className="font-semibold"
            >
              {itemsCart.length}
            </span>
          </div>
          <IconButton onClick={handleClickCart}>
            <ShoppingCartOutlinedIcon
              sx={{
                width: '30px',
                height: '30px',
                color: 'black',
              }}
            />
          </IconButton>
        </div>

        <div className="relative w-[30px] h-[30px] flex justify-end items-center">
          <div className="bg-gray-100 h-[25px] w-[25px] flex justify-center items-center rounded-full absolute -top-5 right-0">
            <span
              style={{
                fontSize: '14px',
              }}
              className="font-semibold"
            >
              {favorites.length}
            </span>
          </div>
          <IconButton>
            <FavoriteBorderOutlinedIcon
              sx={{
                width: '30px',
                height: '30px',
                color: 'black',
              }}
            />
          </IconButton>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
