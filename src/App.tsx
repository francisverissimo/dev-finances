import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { AuthContextProvider } from "./context/AuthContext";
import { HomePage } from "./pages/HomePage";
import { NotFoundPage } from "./pages/NotFoundPage";
import { ForgotPage } from "./pages/ForgotPage";
import { SignUpPage } from "./pages/SignUpPage";
import "react-toastify/dist/ReactToastify.css";

export function App() {
  return (
    <>
      <BrowserRouter>
        <AuthContextProvider>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/forgot" element={<ForgotPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </AuthContextProvider>
      </BrowserRouter>

      <ToastContainer position="top-center" hideProgressBar theme="light" />
    </>
  );
}
