import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Text, Title } from "@mantine/core";
import routes from "./routes";
import protectedRoutes from "./protectedRoutes";
import { Protected } from "@components";

const Router = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {routes.map((route) => {
            return (
              <Route
                key={route.path}
                path={route.path}
                element={<>{route.element}</>}
              />
            );
          })}
          {protectedRoutes.map((route) => {
            return (
              <Route
                key={route.path}
                path={route.path}
                element={<Protected>{route.element}</Protected>}
              />
            );
          })}

          <Route
            path="*"
            element={
              <div>
                <Title c="cherry-red">404</Title>
                <Text>Not Found</Text>
              </div>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default Router;
