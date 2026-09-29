import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<div>SAHAYAK-KAVACH</div>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
