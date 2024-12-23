import { configureStore } from "@reduxjs/toolkit";
import init from "./initSlice/initSLice";

const store = configureStore({
  reducer: {
    init /* Store de configuracion del proyecto */,

    /* Agrega otros slices aquí si es necesario. */
  },
});

export default store;
