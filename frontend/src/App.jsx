import { Toaster } from "sonner";
import { BrowserRouter, Routes, Route } from 'react-router';
import HomePage from "./pages/HomePage";
import NoteFound from "./pages/NoteFound";


function App() {


  return (
    <>
      <Toaster richColors />

      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={<HomePage />}
          />


          <Route
            path="*"
            element={<NoteFound />}
          />
        </Routes>





      </BrowserRouter>
    </>
  )
}

export default App
