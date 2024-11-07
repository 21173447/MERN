import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Import BrowserRouter, not Router from express
import Navigationbar from './Components/Navigationbar';
import HomePage from './Pages/HomePage';
import CreatePage from './Pages/CreatePage';


function App() {
  return (
    <Router> 
      <Navigationbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path ="/create" element = {<CreatePage/>}/>
      </Routes>
    </Router> 
  );
}

export default App;
