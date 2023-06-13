import { Route, Routes } from "react-router-dom"
import AuthContextProvider from "contexts/AuthContext"
import { NavBar, Home, Signin, Protected, Info } from "components"
import "src/index.css"

const App = () => {
  return (
    <AuthContextProvider>
      <NavBar />

      <Routes>
        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/signin"
          element={<Signin />}
        />

        <Route
          path="/info"
          element={
            <Protected>
              <Info />
            </Protected>}
        />
      </Routes>
    </AuthContextProvider>
  )
}

export default App
