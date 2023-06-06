import { Route, Routes } from "react-router-dom"
import "src/index.css"
import AuthContextProvider from "src/contexts/AuthContext"
import Signin from "src/components/SignIn"
import Home from "src/components/Home"
import NavBar from "src/components/NavBar"
import Info from "src/components/Info"
import Protected from "src/components/Protected"

const App = () => {
  return (
    <AuthContextProvider>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<Signin />} />
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

export default App;
