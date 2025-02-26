import { BrowserRouter, Routes, Route } from "react-router-dom";

//Pages
import UnexcitingPage from "./Pages/UnexcitingPage.jsx";
import MainLayout from "./Pages/MainLayout.jsx";

function App() {

  return (
      <BrowserRouter>
          <Routes>
              <Route path="/" element={<MainLayout/>}>
                  {/*<Route index element={<Home />}/>*/}
              </Route>
              <Route path="/*" element={<UnexcitingPage />}/>
          </Routes>
      </BrowserRouter>
  )
}

export default App
