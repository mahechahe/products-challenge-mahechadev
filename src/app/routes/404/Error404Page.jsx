import { useNavigate } from "react-router-dom";

function Error404Page() {
  /* Config */
  const navigate = useNavigate();

  /* Functions */
  const navigateDashboard = () => {
    navigate(`/`);
  };

  return (
    <main>
      <div className="max-w-screen-xl mx-auto px-4 flex items-center justify-start h-screen md:px-8 ">
        <div className="w-full mx-auto space-y-3 text-center">
          <h3 className="text-indigo-600 font-semibold text-6xl">404 Error</h3>
          <p className="text-gray-800 font-semibold text-8xl">
            Página no encontrada
          </p>
          <p className="text-gray-600 text-3xl" style={{ marginTop: "20px" }}>
            Lo sentimos, la página que está buscando no se pudo encontrar o se
            eliminó.
          </p>
          <div
            className="flex flex-wrap items-center justify-center gap-8 "
            style={{ marginTop: "30px" }}
          >
            <button
              type="button"
              onClick={navigateDashboard}
              className="block py-2 px-4 text-white font-medium bg-indigo-600 duration-150 hover:bg-indigo-500 active:bg-indigo-700 rounded-lg w-60 h-16 text-2xl"
            >
              Regresar
            </button>
            <button
              type="button"
              className="block py-2 px-4 text-gray-700 hover:bg-gray-50 font-medium duration-150 active:bg-gray-100 border rounded-lg w-80 h-16 text-2xl"
            >
              Reportar error
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Error404Page;
