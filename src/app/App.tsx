import { BrowserRouter } from "react-router-dom"
import AppRoutes from "../routes/AppRoutes"
import { ToastContainer } from "react-toastify"




function App() {
 

  return (
   <BrowserRouter>

    <AppRoutes/>
     <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            pauseOnHover
            draggable
            theme="colored"
          />
   </BrowserRouter>
  )
}

export default App
