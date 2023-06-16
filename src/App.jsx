import { Route, Routes } from "react-router-dom"
import AuthContextProvider from "contexts/AuthContext"
import { NavBar, Signin, Protected, Home } from "components"
import "src/index.css"

const App = () => {
  return (
    <AuthContextProvider>
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
      </Routes>
    </AuthContextProvider>
  )
}

export default App
