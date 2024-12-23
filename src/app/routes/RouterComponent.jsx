import { Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { routes } from "./routesConfig";

function RouterComponent() {
  return (
    <>
      {/* Routes */}
      <Routes>
        {routes?.map((route) => {
          return (
            <Route
              key={route.path}
              path={route.path}
              element={
                <Suspense fallback={null}>
                  <route.component />
                </Suspense>
              }
            />
          );
        })}

        <Route path="*" element={<Navigate to="/404" />} />
      </Routes>
    </>
  );
}

export default RouterComponent;
