import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import NavBar from './components/NavBar';
import PrivateRoute from './components/PrivateRoute';
import DoubtListPage from './pages/DoubtListPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import AskDoubtPage from './pages/AskDoubtPage';
import DoubtDetailPage from './pages/DoubtDetailPage';
import AnalyticsPage from './pages/AnalyticsPage';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

const App = () => (
  <Router>
    <NavBar />
    <main className="container">
      <Routes>
        <Route path="/" element={<Navigate to="/doubts" replace />} />
        <Route path="/doubts" element={<DoubtListPage />} />
        <Route path="/doubts/:id" element={<DoubtDetailPage />} />
        <Route
          path="/ask"
          element={
            <PrivateRoute>
              <AskDoubtPage />
            </PrivateRoute>
          }
        />
        <Route path="/analytics" element={<AnalyticsPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
      </Routes>
    </main>
    <ToastContainer position="bottom-right" />
  </Router>
);

export default App;
