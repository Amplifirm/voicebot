
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import ReliefGridHomepage from './pages/Home';


function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<ReliefGridHomepage />} />
        

          

          {/* <Route path="/signup" element={<SignupPage />} /> */}
          {/* <Route path="/dashboard" element={<Dashboard />} /> */}
          {/* <Route path="/profile" element={<ProfilePage />} /> */}
        </Routes>
      </div>

      
    </Router>
  );
}

export default App;