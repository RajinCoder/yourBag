import { Route, Routes } from "react-router-dom";
import "./App.css";
import BasketPage from "./pages/BasketPage";
import SavePage from "./pages/SavePage";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<BasketPage />} />
        <Route path="/saved" element={<SavePage />} />
      </Routes>
    </div>
  );
}

export default App;
