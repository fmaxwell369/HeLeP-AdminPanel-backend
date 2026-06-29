// src/App.tsx
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage'; // Assure-toi que ce fichier existe

function App() {
  return (
    <Router>
      <div className="app-container">
        <Routes>
          {/* Route racine redirigeant vers le login */}
          <Route path="/" element={<Navigate to="/login" replace />} />
          
          {/* Page de connexion */}
          <Route path="/login" element={<LoginPage />} />
          
          {/* Tableau de bord (accessible directement pour le moment) */}
          <Route path="/dashboard" element={<DashboardPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;