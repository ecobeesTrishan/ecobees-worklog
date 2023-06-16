import { Route, Routes } from "react-router-dom"
import { AuthContextProvider, TimerProvider } from "contexts"
import { NavBar, Signin, Protected, Home, WorkHistory } from "components"
import "src/index.css"

const App = () => {
  return (
    <AuthContextProvider>
      <TimerProvider>
        <NavBar />

        <Routes>
          <Route
            path="/signin"
            element={<Signin />}
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
  )
}

export default App
