import { BrowserRouter, Routes, Route } from "react-router-dom";

//Pages
import UnexcitingPage from "./Pages/UnexcitingPage.jsx";
import MainLayout from "./Pages/MainLayout.jsx";
import RegistrationPage from "./Pages/RegistrationPage.jsx";
import LoginPage from "./Pages/LoginPage.jsx";

function App() {
  return (
      <BrowserRouter basename={"/TLU_kunstiproject_2025"}>
          <Routes>
              <Route path="/" element={<MainLayout/>}>
                  {/*<Route index element={<Home />}/>*/}
              </Route>
              <Route path="/login" element={<LoginPage/>}/>
              <Route path="/registration" element={<RegistrationPage/>}/>
              <Route path="/*" element={<UnexcitingPage />}/>
          </Routes>
      </BrowserRouter>
  )
}

export default App
