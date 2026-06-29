// src/App.tsx
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';

function App() {
  return (
    <Router>
      <div className="app-container">
        <Routes>
          {/* Route racine redirigeant vers le login */}
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<LoginPage />} />
          
          {/* Ici, nous ajouterons plus tard tes routes protégées (Dashboard, etc.) */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;