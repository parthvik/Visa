import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner";
import HomePage from "@/pages/HomePage";
import BenefitsPage from "@/pages/BenefitsPage";
import ComparePage from "@/pages/ComparePage";
import Header from "@/components/Header";

function App() {
  return (
    <div className="App min-h-screen bg-background">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/benefits/:cardId" element={<BenefitsPage />} />
          <Route path="/compare" element={<ComparePage />} />
        </Routes>
      </BrowserRouter>
      <Toaster position="top-right" richColors />
    </div>
  );
}

export default App;
