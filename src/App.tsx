import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthContextProvider } from "./context/AuthContext";
import { ForgotPage } from "./pages/ForgotPage";
import { HomePage } from "./pages/HomePage";
import { NotFoundPage } from "./pages/NotFoundPage";
import { SignUpPage } from "./pages/SignUpPage";

export function App() {
  return (
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
  );
}
