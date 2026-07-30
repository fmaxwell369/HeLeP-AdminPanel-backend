// src/App.tsx
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import ResetPasswordPage from './pages/ResetPasswordPage';
import DashboardPage from './pages/DashboardPage';
import { DashboardLayout } from './components/layout/DashboardLayout';

// Petit composant utilitaire pour vérifier l'authentification
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  // Vérifie si un token ou un indicateur de connexion existe dans le localStorage
  // Adapte la clé ('token', 'adminToken', etc.) selon ce que tu stockes lors du login
  const isAuthenticated = localStorage.getItem('token') !== null;

  if (!isAuthenticated) {
    // Redirige vers la page de login si non connecté
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

function App() {
  return (
    <Router>
      <div className="app-container">
        <Routes>
          {/* Route racine redirigeant vers le login */}
          <Route path="/" element={<Navigate to="/login" replace />} />
          
          {/* Pages d'authentification (hors dashboard) */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />
          
          {/* Routes du Dashboard protégées avec Layout partagé */}
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute>
                <DashboardLayout />
              </ProtectedRoute>
            }
          >
            {/* Page principale du dashboard (/dashboard) */}
            <Route index element={<DashboardPage />} />
            
            {/* Tes futures sous-pages du dashboard iront ici et heriteront de la protection */}
            {/* <Route path="auth" element={<AuthConfigPage />} /> */}
            {/* <Route path="disputes" element={<DisputesPage />} /> */}
            {/* <Route path="escrow" element={<EscrowPage />} /> */}
            {/* <Route path="settings" element={<SettingsPage />} /> */}
            {/* <Route path="analytics" element={<AnalyticsPage />} /> */}
            {/* <Route path="users" element={<UsersPage />} /> */}
          </Route>

          {/* Redirection ou page 404 globale optionnelle */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;