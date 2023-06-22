import { Route, Routes } from "react-router-dom";
import { AuthContextProvider, TimerProvider } from "contexts";
import { Header, Signin, Protected, Home, WorkHistory } from "components";
import "src/index.css";
import PageNotFound from "./components/PageNotFound";

const App = () => {
  return (
    <AuthContextProvider>
      <TimerProvider>
        <Header />

        <Routes>
          <Route
            path="/signin"
            element={<Signin />}
          />

          <Route
            path="*"
            element={<PageNotFound />}
          />

          <Route
            path="/"
            element={
              <Protected>
                <Home />
              </Protected>}
          />

          <Route
            path="/history"
            element={
              <Protected>
                <WorkHistory />
              </Protected>
            }
          />
        </Routes>
      </TimerProvider>
    </AuthContextProvider>
  );
};

export default App;