
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Bloomsberry from './pages/Home';


function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Bloomsberry />} />
        

          

          {/* <Route path="/signup" element={<SignupPage />} /> */}
          {/* <Route path="/dashboard" element={<Dashboard />} /> */}
          {/* <Route path="/profile" element={<ProfilePage />} /> */}
        </Routes>
      </div>

      
    </Router>
  );
}

export default App;