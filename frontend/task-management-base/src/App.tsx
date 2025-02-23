import { BrowserRouter as Router, Routes, Route,  } from 'react-router-dom';
import Task from './pages/Task';
import AuthPage from './pages/Auth';


function App() {

  return (
    <div className = 'flex items-center align-middle'>
    <Router>
        <Routes>
          <Route path="/" element={<AuthPage />} />
          <Route path="/Tasks"  element={<Task />} />
        </Routes>
  </Router>
  </div>
  )
}

export default App
