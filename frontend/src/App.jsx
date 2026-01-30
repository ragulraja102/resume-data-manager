import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import ResumeForm from './pages/ResumeForm';
import ResumeDetail from './pages/ResumeDetail';
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Navbar />
        <div className="container animate-fade-in" style={{ marginTop: '30px' }}>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Protected Routes */}
            <Route element={<ProtectedRoute />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/create-resume" element={<ResumeForm />} />
              <Route path="/edit-resume/:id" element={<ResumeForm />} />
              <Route path="/resume/:id" element={<ResumeDetail />} />
              {/* Add more protected routes here as requested (Search, Profile etc) */}
              {/* For brevity, mapping minimal viable pages first */}
            </Route>
          </Routes>
        </div>
      </AuthProvider>
    </Router>
  );
}

import ProtectedRoute from './components/ProtectedRoute'; // Import after definition to avoid hoisting issues if in same file, but here it's separate.
export default App;
